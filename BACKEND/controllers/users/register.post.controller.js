const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validateUUID } = require('../../utils/regex/validators');
const { canAssignRole } = require('../../authentification/roleHierarchy');

const registerController = async (req, res) => {
    const { pseudo, email, password, role } = req.body;
    const saltRounds = 10;

    try {
        // Validation basique
        if (!pseudo || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Tous les champs sont obligatoires'
            });
        }

        // Vérifie si l'utilisateur existe déjà
        const existingUser = await prisma.users.findFirst({
            where: { OR: [{ pseudo }, { email }] }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Un utilisateur avec ce pseudo ou email existe déjà'
            });
        }

        // Détermine le rôle (avec middleware intégré)
        req.body.role = role || 'employee';
        canAssignRole(req, res, async () => {
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = await prisma.users.create({
                data: {
                    pseudo,
                    email,
                    password_hash: hash,
                    role: req.body.role,
                    is_active: true
                }
            });

            // Validation UUID
            if (!validateUUID(newUser.id)) {
                console.error('Erreur : UUID invalide généré');
                return res.status(500).json({
                    success: false,
                    message: 'Erreur serveur'
                });
            }

            res.status(201).json({
                success: true,
                message: 'Compte créé avec succès',
                user: {
                    id: newUser.id,
                    pseudo: newUser.pseudo,
                    email: newUser.email,
                    role: newUser.role
                }
            });
        });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création du compte'
        });
    }
};

module.exports = registerController;
