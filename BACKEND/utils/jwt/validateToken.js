const { verify } = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const PUBLIC_KEY_PATH = path.join(process.env.BASE_APP, 'etc/ssh/public_key.key');

module.exports = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const publicKey = fs.readFileSync(PUBLIC_KEY_PATH, 'utf8');
            verify(token, publicKey, { algorithms: ['RS512'] }, (err, decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            });
        } catch (error) {
            reject(error);
        }
    });
};
