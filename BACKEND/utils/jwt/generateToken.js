const { sign } = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()
const rsaPrivateKey = process.env.BASE_APP

const generateToken = async (user, res) => {
    const role = user.role
    if (role === null) {
        return res.status(500).send({error: 'Error occurred during authentication'})
    }

    const payload = {
        pseudo: user.pseudo,
        userId: user.users_id,
        role,
    }

    const privateKey = fs.readFileSync(
        rsaPrivateKey + '/etc/ssh/private_key.key'
    )

    const signOptions = {
        algorithm: 'RS512',
        expiresIn: '14400s',
    }

    const token = sign(payload, privateKey, signOptions)
    return token

}

module.exports = generateToken
