const { PrismaClient } = require("@prisma/client");
const {findUserWhereId} = require("./users.services");

const prisma = new PrismaClient();

const createNotification = async (data) => {
    return await prisma.notifications.create({
        data: {
            ...data,
            is_read: false
        },
    })
}

const markNotificationAsRead = async (id) => {
    return await prisma.notifications.update({
        where: {
            id,
        },
        data: {
            is_read: true,
        }
    })
}

const deleteNotification = async (id) => {
    return await prisma.notifications.delete({
        where: {
            id,
        }
    })
}


const findAllNotifications = async () => {
    return await prisma.notifications.findMany()
}


const findNotificationById = async (id) => {
    return await prisma.notifications.findUnique({
        where: {
            id,
        },
    });
};

const findNotificationsByUserId = async (userId) => {
    return await prisma.notifications.findMany({
        where: {
            userId,
        },
    });
};

module.exports = {
    findUserWhereId,
    findNotificationById,
    findNotificationsByUserId,
    createNotification,
    markNotificationAsRead,
    deleteNotification,
    findAllNotifications
}
