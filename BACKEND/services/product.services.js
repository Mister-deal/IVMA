const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createProduct = async (data) => {
    return await prisma.products.create({
        data,
    })
}

const updateProduct = async (products_id, data) => {
    return await prisma.products.update({
        where: {
            products_id,
        },
        data,
    })
}

const updateQRCode = async (products_id, data) => {
    return await prisma.products.update({
        where: {
            products_id,
        },
        data,
    })
}

const removeProduct = async (products_id) => {
    return await prisma.products.delete({
        where: {
            products_id,
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

const findProductWhereId = async (products_id) => {
    return await prisma.products.findFirst({
        where: {
            products_id,
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

module.exports = {
    createProduct,
    updateProduct,
    updateQRCode,
    findAllProducts,
    findAllProductsWhereCategory,
    findProductWhereId,
    findProductWhereName,
    removeProduct,
}
