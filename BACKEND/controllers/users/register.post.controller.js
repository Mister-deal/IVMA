const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerController = async (req, res) => {
    const { pseudo, email, password, role } = req.body;
    const saltRounds = 10;

    const requesterRole = req.user?.role; // Supposons que l'info est dans req.user

    try {
        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [
                    { pseudo },
                    { email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'Un utilisateur avec ce pseudo ou cet email existe déjà'
            });
        }

        let userRole = 'employee'; // Par défaut

        if (role) {
            if (requesterRole === 'admin') {
                userRole = role;
            }
            else if (requesterRole === 'manager' && role === 'employee') {
                userRole = role;
            }
            else {
                return res.status(403).json({
                    message: 'Vous n\'avez pas les permissions pour créer un compte avec ce rôle'
                });
            }
        }

        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                return res.status(500).json({
                    message: 'Erreur lors de la création du compte'
                });
            }

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Erreur lors de la création du compte'
                    });
                }

                try {
                    const newUser = await prisma.users.create({
                        data: {
                            pseudo,
                            email,
                            password_hash: hash,
                            role: userRole,
                            is_active: true
                        }
                    });

                    return res.status(201).json({
                        message: 'Compte créé avec succès',
                        user: {
                            id: newUser.id,
                            pseudo: newUser.pseudo,
                            email: newUser.email,
                            role: newUser.role
                        }
                    });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({
                        message: 'Erreur lors de la création du compte'
                    });
                }
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erreur serveur'
        });
    }
};

module.exports = registerController;
