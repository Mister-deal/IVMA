const {findUserWhereId} = require("../../services/users.services");
const userDeletion = require('../../services/users.services').removeUser
const findUserId = require('../../services/users.services').findUserWhereId

const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'User id required'
            })
        }

        const userExist = await findUserWhereId(userId)
        if(!userExist){
            return res.status(404).json({
                success: false,
                message: 'User was not found'
            })
        }
        await userDeletion(userId)
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted user'
        })
    } catch (error) {
        console.error('Error while deleting user', error);
        return res.status(500).json({
            success: false,
            message: 'error deleting user',
            error: error.message
        })
    }
}

module.exports = deleteUserController
