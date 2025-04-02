const { PrismaClient } =require("@prisma/client");

const prisma = new PrismaClient();

const createSupplier = async (data) => {
    return await prisma.suppliers.create({
        data
    });
}

const updateSupplier = async (id,data) => {
    return await prisma.suppliers.update({
        where: {
            id,
        },
        data
    });
}

const deleteSupplier = async (id) => {
    return await prisma.suppliers.delete({
        where: {
            id ,
        }
    });
}

const getSupplierById = async (id) => {
    return await prisma.suppliers.findUnique({
        where: { id },
        include: { products: true } // Important pour voir les produits associés
    });
}
const getSupplierByName = async (name) => {
    return await prisma.suppliers.findUnique({
        where: { name },
    });
}


const getAllSuppliers = async (filters = {}) => {
    return await prisma.suppliers.findMany({
        where: filters,
        include: { products: true }
    });
}









module.exports = {
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getAllSuppliers,
    getSupplierById,
    getSupplierByName,
}
