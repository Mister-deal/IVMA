const findUniqueUserEmail = require ('../../services/users.services').findUserWhereEmail
const createResetPassword = require ('../../services/resetPassword.services').createResetPassword
const findUniqueResetPasswordWhereUserId = require('../../services/resetPassword.services').findResetPasswordWhereUserId

const emailRegex = require('../../utils/regex/regex_utils').emailRegex

const nodemailer = require('nodemailer')

const askResetPasswordController = async (req, res) => {
    const data = req.body
    const { email } = data
    let userLogin

    let config = {
        service: 'gmail',
        auth: {
            user: process.env.NOREPLY_EMAIL_ADDRESS,
            pass: process.env.NOREPLY_EMAIL_PASSWORD,
        },
    }

    let transporter = nodemailer.createTransport(config)

    if (email !== undefined && emailRegex.test(email)) {
        userLogin = await findUniqueUserEmail(email.toLocaleLowerCase())
    } else {
        return res
            .status(412)
            .json({ message: 'Error occured during the authentication' })
    }

    if (userLogin !== null) {
        try {
            await createResetPassword({
                userId: userLogin.id,
            })
        } catch (error) {
            return res
                .status(412)
                .json({ message: 'error occuring during the creation' })
        }

        try {
            const resetPassword = await findUniqueResetPasswordWhereUserId(
                userLogin.id
            )
            const resetPasswordLink = resetPassword.resets_password_id
            const link = `http://localhost:3000/reset-password/${resetPasswordLink}`
            const mailOptions = {
                from: config,
                to: email,
                subject:
                    'Réinitialisation du mot de passe sur IVMA',
                html: `<html>
                        <head>
                            <title>Réinitialisation du mot de passe [IVMA]</title>
                        </head>
                        <body>
                            <h1>Lien de réinitialisation du mot de passe de l'application <strong>IVMA</strong></h1>
                            <p>
                                Bonjour ${userLogin.pseudo}, vous avez demandé à réinitialiser votre mot de passe.
                            </p>
                            <p>
                                Voici le lien de réinitalisation : <a href="${link}">ici</a>.
                            </p>
                            <p>Attention, vous n'avez que 15 minutes pour changer de mot de passe.</p>
                        </body>
                    </html>`,
            }
            transporter.sendMail(mailOptions, (error, info) => {
                console.log(error)
                if (error) {
                    return res
                        .status(500)
                        .json({ error: "Email couldn't send" })
                } else {
                    return res.status(201).json({
                        message:
                            'email reset passwword created' + info.response,
                    })
                }
            })
        } catch (error) {
            return res
                .status(412)
                .json({ message: 'error occuring during the mailing' })
        }
    }
}

module.exports = askResetPasswordController
