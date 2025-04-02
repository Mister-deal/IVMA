const { PrismaClient } =require("@prisma/client");

const prisma = new PrismaClient();

const createResetPassword = async (data) => {
    return await prisma.reset_password.create({
        data
    });
}

const findResetPasswordWhereId = async ( id ) => {
    return await prisma.reset_password.findUnique({
        where: {
            id
        }
    })
}

const findResetPasswordWhereUserId = async ( userId ) => {
    return await prisma.reset_password.findUnique({
        where: {
            userId
        }
    })
}

const removeResetPassword = async (id) => {
    return await prisma.reset_password.delete({
        where: {
            id
        }
    })
}

module.exports = {
    createResetPassword, findResetPasswordWhereId,
    findResetPasswordWhereUserId, removeResetPassword
};
