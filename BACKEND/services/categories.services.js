const { PrismaClient } =require("@prisma/client");

const prisma = new PrismaClient();

const createCategory = async (data) => {
    return await prisma.categories.create({
        data
    });
}

const updateCategory = async (categories_id, data) => {
    return await prisma.categories.update({
        where: {
            categories_id
        },
        data
    });
}

const removeCategory = async (categories_id) => {
    return await prisma.categories.delete({
        where: {
            categories_id
        }
    })
}

const findAllCategories = async () => {
    return await prisma.categories.findMany()
}

const findCategoryWhereId = async ( categories_id ) => {
    return await prisma.categories.findUnique({
        where: {
            categories_id
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
