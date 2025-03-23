const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createMovement = async (data) => {
    return await prisma.movements.create({
        data,
    })
}

const updateMovementsWhereUserId = async (movements_id) => {
    return await prisma.movements.update({
        where: {
            movements_id,
        },
        data: {
            userId: null,
        },
    })
}

const removeMovement = async (movements_id) => {
    return await prisma.movements.delete({
        where: {
            movements_id,
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

const findMovementWhereId = async (movements_id) => {
    return await prisma.movements.findUnique({
        where: {
            movements_id,
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
