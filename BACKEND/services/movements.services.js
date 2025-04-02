const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createMovement = async (data) => {
    return await prisma.movements.create({
        data,
    })
}

const updateMovementsWhereUserId = async (id) => {
    return await prisma.movements.update({
        where: {
            id,
        },
        data: {
            userId: null,
        },
    })
}

const removeMovement = async (id) => {
    return await prisma.movements.delete({
        where: {
            id,
        },
    })
}

const findAllMovements = async () => {
    return await prisma.movements.findMany()
}

const findAllMovementsWhereUserId = async (userId) => {
    return await prisma.movements.findMany({
        where: {
            userId
        },
    })
}

const findMovementWhereId = async (id) => {
    return await prisma.movements.findUnique({
        where: {
            id,
        },
    })
}

const findAllMovementsWhereProductId = async (productId) => {
    return await prisma.movements.findMany({
        where: {
            productId,
        },
    })
}

module.exports = {
    createMovement,
    updateMovementsWhereUserId,
    removeMovement,
    findAllMovements,
    findAllMovementsWhereProductId,
    findMovementWhereId,
    findAllMovementsWhereUserId
}
