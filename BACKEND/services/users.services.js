const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createUsers = async (data) => {
    return await prisma.users.create({
        data,
    })
}

const updateUser = async (users_id, data) => {
    return await prisma.users.update({
        where: {
            users_id,
        },
        data,
    })
}

const updateUsers = async (users_id, data) => {
    return await prisma.users.update({
        where: {
            users_id,
        },
        data,
    })
}

const removeUser = async (users_id) => {
    return await prisma.users.delete({
        where: {
            users_id,
        },
    })
}

const updateUserPassword = async (users_id, password_hash) => {
    return await prisma.users.update({
        where: { id: users_id }, // Note: Votre modèle utilise 'id' comme clé, pas 'users_id
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

const updateUserRole = async (userId, newRole) => {
    return await prisma.users.update({
        where: { users_id: userId },
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

const findUserWhereId = async (users_id) => {
    return await prisma.users.findUnique({
        where: {
            users_id,
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
    return await prisma.users.findUnique({
        where: {
            email,
        },
    })
}

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
