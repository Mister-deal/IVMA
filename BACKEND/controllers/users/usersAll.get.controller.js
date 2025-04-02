const { findAllUsers } = require('../../services/users.services');

const getAllUsersController = async (req, res) => {
    try {
        // 1. Vérification des permissions (optionnelle)
        const requesterRole = req.user?.role;
        if (!['admin', 'manager'].includes(requesterRole)) {
            return res.status(403).json({
                success: false,
                message: 'Accès non autorisé',
                error_code: 'FORBIDDEN'
            });
        }

        // 2. Récupération des utilisateurs
        const users = await findAllUsers();

        // 3. Filtrage des données sensibles
        const sanitizedUsers = users.map(user => ({
            id: user.id, // Préférez une nomenclature cohérente (users_id partout)
            pseudo: user.pseudo,
            email: user.email,
            role: user.role,
            is_active: user.is_active,
            created_at: user.created_at,
            updated_at: user.updated_at
        }));

        // 4. Réponse
        res.status(200).json({
            success: true,
            count: sanitizedUsers.length,
            data: sanitizedUsers
        });

    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erreur:`, error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des utilisateurs',
            error_code: 'SERVER_ERROR',
            ...(process.env.NODE_ENV === 'development' && {
                debug: error.message
            })
        });
    }
};

module.exports = getAllUsersController; // Correction: export du bon contrôleur
