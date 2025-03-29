const { findUserWhereId } = require("../../services/users.services");
const { validateUUID } = require('../../utils/regex/validators');

const getUserUniqueController = async (req, res) => {
    const userId = req.params.id;
    const requesterRole = req.user?.role;

    // 1. Validation de l'UUID
    if (!validateUUID(userId)) {
        return res.status(400).json({
            success: false,
            message: 'Format UUID invalide',
            error_code: 'INVALID_UUID',
            expected_format: 'UUIDv4'
        });
    }

    // 2. Vérification des permissions (optionnelle)
    if (!['admin', 'manager'].includes(requesterRole)) {
        return res.status(403).json({
            success: false,
            message: 'Accès non autorisé',
            error_code: 'FORBIDDEN'
        });
    }

    try {
        // 3. Récupération de l'utilisateur
        const user = await findUserWhereId(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé',
                error_code: 'USER_NOT_FOUND',
                user_id: userId
            });
        }

        // 4. Filtrage des données sensibles
        const sanitizedUser = {
            id: user.users_id, // Utilisation cohérente du champ ID
            pseudo: user.pseudo,
            email: user.email,
            role: user.role,
            is_active: user.is_active,
            created_at: user.created_at,
            updated_at: user.updated_at
        };

        // 5. Réponse
        return res.status(200).json({
            success: true,
            data: sanitizedUser
        });

    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erreur:`, error);
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération de l\'utilisateur',
            error_code: 'SERVER_ERROR',
            ...(process.env.NODE_ENV === 'development' && {
                debug: {
                    message: error.message,
                    stack: error.stack
                }
            })
        });
    }
};

module.exports = getUserUniqueController;
