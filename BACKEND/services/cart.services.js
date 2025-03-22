const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createCart = async (data) => {
    return await prisma.cart.create({
        data,
    })
}


const updateCart = async (users_id, data) => {
    return await prisma.cart.update({
        where: {
            users_id,
        },
        data,
    })
}

const removeCart = async (users_id) => {
    return await prisma.cart.delete({
        where: {
            users_id,
        },
    })
}



const findCartWhereId = async (users_id) => {
    return await prisma.cart.findUnique({
        where: {
            users_id,
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
