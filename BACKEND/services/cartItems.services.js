const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const addCartItem = async (data) => {
    return await prisma.cartItems.create({
        data: {
            ...data,
            scanned_at: new Date(), // Définit la date de scan actuelle
        },
    });
};

const updateCartItemQuantity = async (id, quantity) => {
    return await prisma.cartItems.update({
        where: {
            id,
        },
        data: {
            quantity,
        },
    });
};

const removeCartItem = async (id) => {
    return await prisma.cartItems.delete({
        where: {
            id,
        },
    });
};

const findAllCartItemsByCartId = async (id) => {
    return await prisma.cartItems.findMany({
        where: {
            id,
        },
        include: {
            product: true, // Inclut les détails du produit associé
        },
    });
};

const findCartItemById = async (id) => {
    return await prisma.cartItems.findUnique({
        where: {
            id,
        },
        include: {
            product: true, // Inclut les détails du produit associé
        },
    });
};

const findCartItemByProductAndCart = async (id, productId) => {
    return await prisma.cartItems.findFirst({
        where: {
            id,
            productId,
        },
        include: {
            product: true, // Inclut les détails du produit associé
        },
    });
};

module.exports = {
    addCartItem,
    updateCartItemQuantity,
    removeCartItem,
    findAllCartItemsByCartId,
    findCartItemById,
    findCartItemByProductAndCart,
};
