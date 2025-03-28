const updateRoleUserController = require("./updatePasswordUser.patch.controller");
const getAllUsers = require('../../services/users.services').findAllUsers

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers

        const sanitizedUsers = users.map(user => ({
            id: user.users_id || user.id,
            pseudo: user.pseudo,
            email: user.email,
            role: user.role,
            is_active: user.is_active,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }))

        res.status(200).json({
            success: true,
            data: sanitizedUsers,
        });
    } catch (error) {
        console.error('Error during the retrieval of all users:', error)
        res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message,
        })
    }
}

module.exports = updateRoleUserController
