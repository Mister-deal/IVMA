const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createCart = async (data) => {
    return await prisma.cart.create({
        data,
    })
}


const updateCart = async (userId, data) => {
    return await prisma.cart.update({
        where: {
            userId,
        },
        data,
    })
}

const removeCart = async (userId) => {
    return await prisma.cart.delete({
        where: {
            userId,
        },
    })
}



const findCartWhereId = async (userId) => {
    return await prisma.cart.findUnique({
        where: {
            userId,
        },
    })
}

const findCartWherePseudo = async (pseudo) => {
    return await prisma.cart.findFirst({
        where: {
            pseudo,
        },
    })
}


module.exports = {
    createCart,
    updateCart,
    removeCart,
    findCartWherePseudo,
    findCartWhereId,
}
