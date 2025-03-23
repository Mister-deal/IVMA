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

const markNotificationAsRead = async (notifications_id) => {
    return await prisma.notifications.update({
        where: {
            notifications_id,
        },
        data: {
            is_read: true,
        }
    })
}

const deleteNotification = async (notifications_id) => {
    return await prisma.notifications.delete({
        where: {
            notifications_id,
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

const findNotificationsByUserId = async (user_id) => {
    return await prisma.notifications.findMany({
        where: {
            user_id,
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
