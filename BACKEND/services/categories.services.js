const { PrismaClient } =require("@prisma/client");

const prisma = new PrismaClient();

const createCategory = async (data) => {
    return await prisma.categories.create({
        data
    });
}

const updateCategory = async (id, data) => {
    return await prisma.categories.update({
        where: {
            id
        },
        data
    });
}

const removeCategory = async (id) => {
    return await prisma.categories.delete({
        where: {
            id
        }
    })
}

const findAllCategories = async () => {
    return await prisma.categories.findMany()
}

const findCategoryWhereId = async ( id ) => {
    return await prisma.categories.findUnique({
        where: {
            id
        }
    })
}

const findCategoryWhereName = async ( name ) => {
    return await prisma.categories.findFirst({
        where: {
            name
        }
    })
}

module.exports =
    {createCategory, updateCategory, findAllCategories,
        findCategoryWhereId, findCategoryWhereName, removeCategory};
