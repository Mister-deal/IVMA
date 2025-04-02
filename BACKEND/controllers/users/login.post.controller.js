const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

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



    console.log('Type de body:', typeof req.body, 'Contenu:', req.body);

    const { email, password } = req.body;

    console.log('\n=== Nouvelle requête de login ===');
    console.log('Body reçu:', { email: req.body.email, password: '***' });

    // 1. Vérification de la clé privée
    if (!fs.existsSync(PRIVATE_KEY_PATH)) {
        console.error('Erreur: Clé privée introuvable', PRIVATE_KEY_PATH);
        return res.status(500).json({ error: 'Configuration serveur invalide' });
    }

    try {
        // 2. Validation des entrées
        console.log('\n--- VALIDATION ---');
        const isEmailValid = email && emailRegex.test(email);
        const isPasswordValid = password && passwordRegex.test(password);

        console.log(`Email valide: ${isEmailValid} | Password valide: ${isPasswordValid}`);

        if (!isEmailValid) {
            return res.status(400).json({
                error: 'Format email invalide',
                error_code: 'INVALID_EMAIL'
            });
        }

        if (!isPasswordValid) {
            return res.status(400).json({
                error: 'Le mot de passe doit contenir 8 caractères avec majuscule, minuscule et chiffre',
                error_code: 'INVALID_PASSWORD'
            });
        }

        // 3. Recherche de l'utilisateur
        const userLogin = await findUserWhereEmail(email.toLowerCase());
        console.log('User from service:', userLogin); // Doit maintenant afficher l'utilisateur
        console.log('Utilisateur trouvé:', userLogin ? `ID: ${userLogin.id}` : 'Non trouvé');

        if (!userLogin || !validateUUID(userLogin.id)) {
            return res.status(401).json({
                error: 'Identifiants incorrects',
                error_code: 'AUTH_FAILED'
            });
        }

        // 4. Vérification du mot de passe
        const user = await findUserWhereId(userLogin.id);
        const isPasswordMatch = user && await bcrypt.compare(password, user.password_hash);

        console.log('Comparaison mot de passe:', {
            match: isPasswordMatch,
            hashExists: !!user?.password_hash
        });

        if (!isPasswordMatch) {
            return res.status(401).json({
                error: 'Identifiants incorrects',
                error_code: 'AUTH_FAILED'
            });
        }

        // 5. Génération du token
        const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
        const token = sign({
            pseudo: user.pseudo,
            id: user.id,
            role: user.role
        }, privateKey, JWT_OPTIONS);

        console.log('Connexion réussie pour:', user.email);
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                pseudo: user.pseudo,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Erreur critique:', {
            message: error.message,
            stack: error.stack.split('\n')[0]
        });
        return res.status(500).json({
            error: 'Erreur serveur',
            error_code: 'SERVER_ERROR'
        });
    }
};
module.exports = loginController;
