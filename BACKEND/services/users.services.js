const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createUsers = async (data) => {
    return await prisma.users.create({
        data,
    })
}

const updateUser = async (id, data) => {
    return await prisma.users.update({
        where: {
            id,
        },
        data,
    })
}

const updateUsers = async (id, data) => {
    return await prisma.users.update({
        where: {
            id,
        },
        data,
    })
}

const removeUser = async (id) => {
    return await prisma.users.delete({
        where: {
            id,
        },
    })
}

const updateUserPassword = async (id, password_hash) => {
    return await prisma.users.update({
        where: { id: id }, // Note: Votre modèle utilise 'id' comme clé, pas 'users_id
        data: {
            password_hash,
            updated_at: new Date()
        },
        select: {
            id: true,
            pseudo: true,
            email: true,
            role: true,
            is_active: true
        }
    });
};

const updateUserRole = async (id, newRole) => {
    return await prisma.users.update({
        where: { id: id },
        data: {
            role: newRole,
            updated_at: new Date() // Mise à jour automatique du timestamp
        },
        select: {
            users_id: true,
            pseudo: true,
            email: true,
            role: true,
            is_active: true
        }
    });
};

const findAllUsers = async () => {
    return await prisma.users.findMany()
}

const findUserWhereId = async (id) => {
    return await prisma.users.findUnique({
        where: {
            id,
        },
    })
}

const findUserWherePseudo = async (pseudo) => {
    return await prisma.users.findFirst({
        where: {
            pseudo,
        },
    })
}

const findUserWhereEmail = async (email) => {
    // Solution garantie - même requête que votre test
    const users = await prisma.$queryRaw`
        SELECT id, email, password_hash, pseudo, role, is_active 
        FROM users 
        WHERE email = ${email.toLowerCase()}
    `;
    return users[0]; // Retourne le premier résultat
};

module.exports = {
    createUsers,
    updateUser,
    updateUsers,
    removeUser,
    findAllUsers,
    findUserWhereEmail,
    findUserWherePseudo,
    findUserWhereId,
    updateUserPassword,
    updateUserRole
}
