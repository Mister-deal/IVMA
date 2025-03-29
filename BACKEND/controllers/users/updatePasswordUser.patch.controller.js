const updateUserPassword = require('../../services/users.services').updateUserPassword;
const bcrypt = require('bcrypt');
const { findUserWhereId } = require('../../services/users.services');
const { validateUUID } = require('../../utils/regex/validators');
const { passwordRegex} = require('../../utils/regex/regex_utils')

const updateUserPasswordController = async (req, res) => {
    const { userId, newPassword } = req.body;
    const requesterRole = req.user?.role;

    // 1. Vérification des permissions
    if (requesterRole !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Action réservée aux administrateurs',
            error_code: 'FORBIDDEN_ACTION'
        });
    }

    // 2. Validation des entrées
    if (!userId || !validateUUID(userId)) {
        return res.status(400).json({
            success: false,
            message: 'UUID utilisateur invalide',
            error_code: 'INVALID_UUID'
        });
    }

    if (!newPassword || !passwordRegex.test(newPassword)) {
        return res.status(400).json({
            success: false,
            message: 'Le mot de passe doit contenir 8 caractères avec majuscule, minuscule et chiffre',
            error_code: 'INVALID_PASSWORD_FORMAT'
        });
    }

    try {
        // 3. Vérification de l'existence de l'utilisateur
        const user = await findUserWhereId(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé',
                error_code: 'USER_NOT_FOUND'
            });
        }

        // 4. Hashage du mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // 5. Mise à jour
        const updatedUser = await updateUserPassword(userId, hashedPassword);

        return res.status(200).json({
            success: true,
            message: 'Mot de passe mis à jour avec succès',
            data: {
                id: updatedUser.id,
                pseudo: updatedUser.pseudo,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({
            success: false,
            message: 'Erreur serveur',
            error_code: 'SERVER_ERROR',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = updateUserPasswordController;
