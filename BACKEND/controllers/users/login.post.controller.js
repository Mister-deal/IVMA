const bcrypt = require('bcrypt');
const emailRegex = require('../../utils/regex/regex_utils').emailRegex
const passwordRegex = require('../../utils/regex/regex_utils').passwordRegex

const findUserId =  require('../../services/users.services').findUserWhereId
const findUserEmail =  require('../../services/users.services').findUserWhereEmail

const { sign } = require('jsonwebtoken');
const fs = require('fs');

const path = require('path');
require('dotenv').config();

const privateKeyPath = path.join(process.env.BASE_APP, 'etc/ssh/private_key.key');
if(!fs.existsSync(privateKeyPath)){
    console.error('error: Private key does not found: ', privateKeyPath)
    return res.status(500).send({error: 'Error occurred during authentication'})
}

const loginController = async (req, res) => {
    const data = req.body
    const {email, password} = data
    console.log(data)
    let userLogin

    if(email !== null && emailRegex.test(email)) {
        userLogin = await findUserEmail(email.toLowerCase())
    }

    try {
        const user = await findUserId(userLogin.user_id)
        if(user !== null) {
            const result = await bcrypt.compare(password, user.password)
            if(result) {
                const payload = {
                    pseudo: user.pseudo,
                    userId: user.user_id,
                    role: user.role,
                }

                const privateKey = fs.readFileSync(privateKeyPath, 'utf8')

                const signOptions = {
                    algorithm: 'RS512',
                    expiresIn: '14400s',
                }
                const token = sign(payload, privateKey, signOptions)

                console.log('token generated: ', token)
                res.status(200).json({token})
            } else {
                return res.status(401).json({error: 'Invalid Credentials'})
            }
        }else {
            return res.status(401).json({error: 'Invalid Credentials'})
        }
    } catch (error) {
        console.error('error during the login process:', error)
        return res.status(500).json({error: 'internal server error'})
    }
}

module.exports = loginController
