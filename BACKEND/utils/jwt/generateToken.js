// utils/auth/generateToken.js
const fs = require('fs');
const { sign } = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const PRIVATE_KEY_PATH = path.join(process.env.BASE_APP, 'etc/ssh/private_key.key');

module.exports = async (user) => {
    const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');

    return sign(
        {
            pseudo: user.pseudo,
            userId: user.users_id,
            role: user.role
        },
        privateKey,
        {
            algorithm: 'RS512',
            expiresIn: '14400s'
        }
    );
};

