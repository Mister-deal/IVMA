const express = require('express');
const router = express.Router();
const auth = require('../authentification/auth');
const { checkRole } = require('../authentification/roleHierarchy');

const {validateUUID} = require('../utils/regex/validators')

const registerPostController = require('../controllers/users/register.post.controller');
const loginPostController = require('../controllers/users/login.post.controller');
const userAllGetController = require('../controllers/users/usersAll.get.controller');
const userUniqueGetController = require('../controllers/users/userUnique.get.controller');
const updateUserPatchController = require('../controllers/users/updatePasswordUser.patch.controller');
const updateRoleUserPatchController = require('../controllers/users/updatePasswordUser.patch.controller');
const deleteUserController = require('../controllers/users/user.delete.controller');

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
    (req, res, next) => {
        console.log('Rôle actuel:', req.user?.role); // Debug
        next();
    },
    checkRole(['admin', 'manager']),
    userAllGetController
);


router.get('/user/:id',
    (req, res, next) => {
        console.log('[MIDDLEWARE] Après auth - avant validateUUID');
        next();
    },
    (req, res, next) => {
        console.log('[MIDDLEWARE] Après validateUUID - avant contrôleur');
        next();
    },
    userUniqueGetController
);

router.get('/test', (req, res) => {
    console.log('[TEST] Route test appelée');
    res.json({ status: 'OK', timestamp: new Date() });
});

router.patch('/user/:id/password',
    checkRole(['admin', 'user']),
    updateUserPatchController
);

router.patch('/user/:id/role',
    checkRole(['admin']), // Seul un admin peut modifier les rôles
    updateRoleUserPatchController
);

router.delete('/user/:id',
    checkRole(['admin']),
    deleteUserController
);

module.exports = router;
