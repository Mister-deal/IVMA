const updatePasswordUser = require('../../services/users.services').updateUserPassword
const bcrypt = require('bcrypt');
const findUserWhereId = require('../../services/users.services').findUserWhereId

const updateRoleUserController = async (req, res) => {
    const { userId, newPassword } = req.body;
    const requesterRole = req.user?.role;

    if(requesterRole !== 'admin'){
        return res.status(403).json({message: 'Action only available for the admin'});
    }

    if (!userId || !newPassword) {
        return res.status(400).json({
            message: 'UserId and new password required'
        });
    }

    try {
        const user = await findUserWhereId(userId);
        if (!user) {
            return res.status(404).json({message: 'User was not found'});
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const updatedUser = await updatePasswordUser(userId, hashedPassword);

        return res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error while updating user', error);
        return res.status(500).json({
            message: 'error server',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

module.exports = updateRoleUserController
