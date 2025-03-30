const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { checkRole } = require('../middlewares/roleMiddleware');
const {
    registerPostController,
    loginPostController,
    userAllGetController,
    userUniqueGetController,
    updateUserPatchController,
    updateRoleUserPatchController,
    deleteUserController
} = require('../controllers/users');

// Routes publiques
router.post('/register', registerPostController);
router.post('/login', loginPostController);
router.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    return res.status(200).json({
        success: true,
        message: 'Déconnexion réussie'
    });
});

// Routes protégées
router.use(auth); // Authentification requise pour toutes les routes suivantes

// Gestion des utilisateurs
router.get('/users',
    checkRole(['admin', 'manager']),
    userAllGetController
);

router.get('/users/:id',
    checkRole(['admin', 'manager', 'user']),
    validateUUID, // Middleware supplémentaire pour valider l'UUID
    userUniqueGetController
);

router.patch('/users/:id/password',
    checkRole(['admin', 'user']),
    updateUserPatchController
);

router.patch('/users/:id/role',
    checkRole(['admin']), // Seul un admin peut modifier les rôles
    updateRoleUserPatchController
);

router.delete('/users/:id',
    checkRole(['admin']),
    deleteUserController
);

module.exports = router;
