const express = require('express');
const validateToken = require('../utils/jwt/validateToken');
const router = express.Router();

router.use(async (req, res, next) => {
    console.log('[AUTH] Début middleware pour:', req.method, req.path);

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            console.log('[AUTH] Token manquant');
            return res.status(401).json({ error: 'Token manquant' });
        }

        console.log('[AUTH] Validation du token...');
        const decoded = await validateToken(token);

        req.user = decoded;
        console.log('[AUTH] Utilisateur authentifié:', decoded.id);
        next();

    } catch (error) {
        console.error('[AUTH ERREUR]', error.message);
        return res.status(401).json({ error: 'Token invalide' });
    }
});

// Middleware de vérification de rôle
router.requireRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Rôle ${roles.join(',')} requis`
            });
        }
        next();
    };
};

module.exports = router;
