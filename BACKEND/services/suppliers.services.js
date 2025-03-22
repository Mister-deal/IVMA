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








module.exports = {
    createSupplier,
    updateSupplier,
    deleteSupplier,
}
