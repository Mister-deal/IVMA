const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const publicKeyPath = process.env.BASE_APP + '/etc/ssh/public_key.key'

const validateToken = (token) => {
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8')

    try {
        const decoded = jwt.verify(token, publicKey, {
            algorithm: ['RS512'],
        })
        console.log(decoded)
        return decoded
    } catch (error) {
        console.error('token validation error', error)
        return null
    }
}
module.exports = validateToken;
