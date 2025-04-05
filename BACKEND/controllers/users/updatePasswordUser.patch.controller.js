const updateUserPassword = require('../../services/users.services').updateUser;
const bcrypt = require('bcrypt');
const { findUserWherePseudo } = require('../../services/users.services');
const { validateUUID } = require('../../utils/regex/validators');
const role = require('../../authentification/role');

const updateUserPasswordController = async (req, res) => {
    console.log('Début updateUserPasswordController');

    const { password } = req.body;
    const AdminRole = role.admin;
    const tokenId = req.user.id;
    const tokenRole = req.user.role;
    const customerPseudo = req.params.pseudo;

    // Validation UUID
    if (!validateUUID(tokenId)) {
        return res.status(401).json({
            success: false,
            message: "Token ID invalide"
        });
    }

    // Vérification du rôle
    if (tokenRole !== AdminRole) {
        return res.status(403).json({
            success: false,
            message: "Permissions insuffisantes"
        });
    }

    // Validation mot de passe
    if (!password || password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Le mot de passe doit contenir au moins 8 caractères"
        });
    }

    try {
        // Recherche utilisateur
        const user = await findUserWherePseudo(customerPseudo);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
        }

        // Hachage du mot de passe (bcrypt gère automatiquement le salt)
        const hashPassword = await bcrypt.hash(password, 10);

        // Mise à jour en base (sans le salt)
        await updateUserPassword(user.id, {
            password_hash: hashPassword  // Envoyez seulement le hash
        });

        return res.status(200).json({
            success: true,
            message: "Mot de passe mis à jour avec succès"
        });

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({
            success: false,
            message: "Erreur serveur",
            error: error.message
        });
    }
};

module.exports = updateUserPasswordController;
