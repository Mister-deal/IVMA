const {findUserWhereId} = require("../../services/users.services");
const getUserUnique = require("../../services/users.services").findUserWhereId

const getUserUniqueController = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: 'UserId is required'
            })
        }
        const user = await findUserWhereId(userId);
        if (!user) {
            return res.status(404).json({message: 'User was not found'});
        }

        const sanitizedUser = {
            id: user.users_id || user.id,
            pseudo: user.pseudo,
            email: user.email,
            role: user.role,
            is_active: user.is_active,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }

        res.status(200).json({
            success: true,
            data: sanitizedUser,
        })
    } catch (error) {
        console.error('Error during the retrieval of the user:', error)
        res.status(500).json({
            success: false,
            message: 'error during the users retrieval',
            error: error.message,
        })
    }
}

module.exports = getUserUniqueController
