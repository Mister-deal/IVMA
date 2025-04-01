const { PrismaClient } =require("@prisma/client");

const prisma = new PrismaClient();

const createSupplier = async (data) => {
    return await prisma.suppliers.create({
        data
    });
}

const updateSupplier = async (suppliers_id,data) => {
    return await prisma.suppliers.update({
        where: {
            suppliers_id,
        },
        data
    });
}

const deleteSupplier = async (supplier_id) => {
    return await prisma.suppliers.delete({
        where: {
            supplier_id ,
        }
    });
}

const getSupplierById = async (supplier_id) => {
    return await prisma.suppliers.findUnique({
        where: { supplier_id },
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
