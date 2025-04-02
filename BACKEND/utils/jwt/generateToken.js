const fs = require('fs');
const path = require('path');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

const PRIVATE_KEY_PATH = path.join(process.env.BASE_APP, 'etc/ssh/private_key.key');

module.exports = async (user) => {
    try {
        // 1. Validation des entrées
        if (!user || !user.id || !user.pseudo || !user.role) {
            throw new Error('Données utilisateur incomplètes');
        }

        // 2. Vérification de la clé privée
        if (!fs.existsSync(PRIVATE_KEY_PATH)) {
            throw new Error(`Fichier de clé privée introuvable: ${PRIVATE_KEY_PATH}`);
        }

        // 3. Lecture de la clé
        const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');

        // 4. Génération du token
        const token = sign(
            {
                id: user.id,
                pseudo: user.pseudo,
                role: user.role,
                iss: 'ivma-backend',  // Émetteur
                aud: 'ivma-frontend'  // Audience
            },
            privateKey,
            {
                algorithm: 'RS512',
                expiresIn: '4h',  // Plus lisible que 14400s
                header: {
                    typ: 'JWT',
                    alg: 'RS512'
                }
            }
        );

        return token;

    } catch (error) {
        console.error('Erreur lors de la génération du JWT:', error.message);
        throw new Error('Échec de la génération du token');
    }
};
