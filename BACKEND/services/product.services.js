const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createProduct = async (data) => {
    return await prisma.products.create({
        data,
    })
}

const updateProduct = async (id, data) => {
    return await prisma.products.update({
        where: {
            id,
        },
        data,
    })
}

const updateQRCode = async (id, data) => {
    return await prisma.products.update({
        where: {
            id,
        },
        data,
    })
}

const removeProduct = async (id) => {
    return await prisma.products.delete({
        where: {
            id,
        },
    })
}

const findAllProducts = async () => {
    return await prisma.products.findMany()
}

const findAllProductsWhereCategory = async (categoryId) => {
    return await prisma.products.findMany({
        where: {
            categoryId,
        },
    })
}

const findProductWhereId = async (id) => {
    return await prisma.products.findFirst({
        where: {
            id,
        },
    })
}

const findProductWhereName = async (name) => {
    return await prisma.products.findFirst({
        where: {
            name,
        },
    })
}

const findProductWhereSku = async (sku) => {
    return await prisma.products.findFirst({
        where: {
            sku,
        },
    })
}

module.exports = {
    createProduct,
    updateProduct,
    updateQRCode,
    findAllProducts,
    findAllProductsWhereCategory,
    findProductWhereId,
    findProductWhereName,
    removeProduct,
    findProductWhereSku
}
