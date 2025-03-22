const { PrismaClient } =require("@prisma/client");

const prisma = new PrismaClient();

const createResetPassword = async (data) => {
    return await prisma.reset_password.create({
        data
    });
}

const findResetPasswordWhereId = async ( resets_password_id ) => {
    return await prisma.reset_password.findUnique({
        where: {
            resets_password_id
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

const removeResetPassword = async (resets_password_id) => {
    return await prisma.reset_password.delete({
        where: {
            resets_password_id
        }
    })
}

module.exports = {
    createResetPassword, findResetPasswordWhereId,
    findResetPasswordWhereUserId, removeResetPassword
};
