const { findUserWhereId } = require("../../services/users.services");
const uuid = require('uuid');

const getUserUniqueController = async (req, res) => {
    const userId = req.params.id;

    const validate = uuid.validate
    const tokenUserId = req.user.id;
    if (userId !== tokenUserId) {
        return res.status(403).json({
            success: false,
            message: 'Accès non autorisé à ces données utilisateur'
        });
    }

    if (!validate(tokenUserId)) {
        return res.status(401).json({ message: 'Unauthorized' })
        }

    try {
        const user = await findUserWhereId(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur introuvable'
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: user.id,
                pseudo: user.pseudo,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('[ERREUR]', error);
        return res.status(500).json({
            success: false,
            message: 'Erreur serveur',
            error_details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = getUserUniqueController;
