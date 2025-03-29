const findUserWhereId = require('../../services/users.services').findUserWhereId
const findUniqueResetPassword = require('../../services/resetPassword.services').findResetPasswordWhereId
const updateUserPassword = require('../../services/users.services').updateUserPassword
const removeResetPassword = require('../../services/resetPassword.services').removeResetPassword

const bcrypt = require('bcrypt')
const passwordRegex = require('../../utils/regex/regex_utils').passwordRegex
const getTimeBetweenDate = require('../../utils/date/getTimeBetweenDate.utils')

const nodemailer = require('nodemailer')

const resetPasswordPatchController = async (req, res) => {
    const data = req.body
    const {password} = data

    const requestId = req.params.id
    const saltRounds = 10

    if( password === undefined ||
        password === null      ||
        passwordRegex.test(password)) {
        return res.status(412).json({
            message: 'invalid password. wrong dataset',
        })
    }

    const resetPassword = await findUniqueResetPassword(requestId)
    if(resetPassword === null) {
        return res.status(401).json({ message: 'reset password demand not found' })
    }

    const actualDate = new Date()

    const creationDate = resetPassword.created_at

    const diffInMinutes = getTimeBetweenDate((creationDate.toJSON(), actualDate.toJSON()) /60)

    if(diffInMinutes > 15) {
        res.status(500).json({message: 'Ask again in 15 minutes'})
    }

    bcrypt.genSalt(saltRounds, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                message: err.message,
            })
        }
        const user = await findUniqueResetPassword(resetPassword.userId)
        try {
            await updateUserPassword(user.users_id, {
                pseudo: user.pseudo,
                password: hash,
                salt,
                role: user.role,
            })
        } catch (error) {
            return res.status(500).json({
                message: "error while updating password",
            })
        }
    })

    try {
        await removeResetPassword(resetPassword.resets_password_id)
    } catch (error) {
        return res.status(500).json({
            message: "error while deleting resetPassword",
        })
    }

    let config = {
        service: 'gmail',
        auth: {
            user: process.env.NOREPLY_EMAIL_ADDRESS,
            pass: process.env.NOREPLY_EMAIL_PASSWORD,
        },
    }

    let transporter = nodemailer.createTransport(config)

    try {
        const user = await findUserWhereId(resetPassword.users_id)
        const mailOptions = {
            from: config,
            to: user.email,
            subject: "confirmation modification du mot de passe",
            html: `<html>
                    <head>
                        <title>Réinitialisation du mot de passe réussi</title>
                    </head>
                    <body>
                        <h1>Votre mot de passe a bien été réinitalisé !</h1>
                        <p>
                    Bonjour ${user.pseudo}, félicitations. vous avez bien réinitialisé votre mot de passe.
                </p>
            </body>
        </html>`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ error: 'email could not be sent' })
            } else {
                return res.status(200).json({
                    message: 'email reset password has been created' + info.response,
                })
            }
        })
    } catch (error) {
        return res.status(500).json({message: 'error while creating the account'})
    }
}

module.exports = resetPasswordPatchController
