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

const getLoginController = require('../controllers/users/login.get.controller');

// Routes publiques
router.get('/login', getLoginController );

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
