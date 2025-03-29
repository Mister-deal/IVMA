const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Importations
const {
    emailRegex,
    passwordRegex
} = require('../../utils/regex/regex_utils');
const {
    findUserWhereEmail,
    findUserWhereId
} = require('../../services/users.services');
const {
    validateUUID
} = require('../../utils/regex/validators');

// Configuration JWT
const PRIVATE_KEY_PATH = path.join(process.env.BASE_APP, 'etc/ssh/private_key.key');
const JWT_OPTIONS = {
    algorithm: 'RS512',
    expiresIn: '14400s' // 4 heures
};

const loginController = async (req, res) => {
    const { email, password } = req.body;

    // 1. Vérification de la clé privée
    if (!fs.existsSync(PRIVATE_KEY_PATH)) {
        console.error('Erreur: Clé privée introuvable', PRIVATE_KEY_PATH);
        return res.status(500).json({
            error: 'Configuration serveur invalide'
        });
    }

    try {
        // 2. Validation des entrées
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Format email invalide',
                error_code: 'INVALID_EMAIL'
            });
        }

        if (!password || !passwordRegex.test(password)) {
            return res.status(400).json({
                error: 'Le mot de passe doit contenir 8 caractères avec majuscule, minuscule et chiffre',
                error_code: 'INVALID_PASSWORD'
            });
        }

        // 3. Recherche de l'utilisateur
        const userLogin = await findUserWhereEmail(email.toLowerCase());
        if (!userLogin || !validateUUID(userLogin.users_id)) {
            return res.status(401).json({
                error: 'Identifiants incorrects',
                error_code: 'AUTH_FAILED'
            });
        }

        // 4. Vérification du mot de passe
        const user = await findUserWhereId(userLogin.users_id);
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({
                error: 'Identifiants incorrects',
                error_code: 'AUTH_FAILED'
            });
        }

        // 5. Génération du token
        const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
        const token = sign(
            {
                pseudo: user.pseudo,
                userId: user.users_id,
                role: user.role
            },
            privateKey,
            JWT_OPTIONS
        );

        // 6. Réponse
        return res.status(200).json({
            token,
            user: {
                id: user.users_id,
                pseudo: user.pseudo,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Erreur lors de l\'authentification:', error);
        return res.status(500).json({
            error: 'Erreur serveur',
            error_code: 'SERVER_ERROR'
        });
    }
};

module.exports = loginController;
