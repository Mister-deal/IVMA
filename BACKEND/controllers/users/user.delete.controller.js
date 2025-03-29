const { findUserWhereId, removeUser } = require("../../services/users.services");
const { validateUUID } = require('../../utils/regex/validators');

const deleteUserController = async (req, res) => {
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

    // 2. Vérification des permissions (optionnel)
    if (requesterRole !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Action réservée aux administrateurs',
            error_code: 'FORBIDDEN_ACTION'
        });
    }

    try {
        // 3. Vérification de l'existence de l'utilisateur
        const userExist = await findUserWhereId(userId);
        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé',
                error_code: 'USER_NOT_FOUND',
                user_id: userId
            });
        }

        // 4. Prévention de l'auto-suppression (optionnel)
        if (req.user.userId === userId) {
            return res.status(403).json({
                success: false,
                message: 'Vous ne pouvez pas supprimer votre propre compte',
                error_code: 'SELF_DELETION_FORBIDDEN'
            });
        }

        // 5. Suppression
        await removeUser(userId);

        return res.status(200).json({
            success: true,
            message: 'Utilisateur supprimé avec succès',
            deleted_user_id: userId,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erreur suppression utilisateur:`, error);

        return res.status(500).json({
            success: false,
            message: 'Échec de la suppression',
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

module.exports = deleteUserController;
