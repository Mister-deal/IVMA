const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();




const getLoginController = async (req, res) => {
    try{
        // 1. Vérification de la clé privée
        const PRIVATE_KEY_PATH = path.join(process.env.BASE_APP, 'etc/ssh/private_key.key');
        if (!fs.existsSync(PRIVATE_KEY_PATH)) {
            console.error('Erreur: Clé privée introuvable', PRIVATE_KEY_PATH);
            return res.status(500).json({
                error: 'Configuration serveur invalide'
            });
        }

        // 2. Vérification de l'authentification
        if (req.user) {
            return res.status(200).json({
                message: 'Utilisateur déjà authentifié',
                user: req.user
            });
    }


        // 3. Envoyer des données de configuration utile au frontend
        res.status(200).json({
            message: 'Page de connexion',
            config: {
                passwordRequirements: {
                    minLength: 8,
                    needsUpper: true,
                    needsNumber: true,
                    needsSpecial: false
                },
                enableOAuth: false // Exemple de configuration
            }
        });

    } catch (error) {
        console.error('Erreur dans getLoginController:', error);
        res.status(500).json({
            error: 'Erreur serveur',
            error_code: 'SERVER_ERROR'
        });
    }
};

module.exports = getLoginController;