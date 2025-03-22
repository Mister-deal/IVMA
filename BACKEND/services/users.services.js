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
}
