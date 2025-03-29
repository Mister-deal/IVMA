const updateRoleUserPatch = require('../../services/users.services').updateUserRole
const findUserId = require('../../services/users.services').findUserWhereId
const {validateUUID} = require('../../utils/regex/validators')

const ALLOWED_ROLES = ['ADMIN', 'MANAGER', 'EMPLOYEE']

const updateRoleUserController = async (req, res) => {
    try {
        const {userId} = req.params
        const {newRole} = req.body

        if (!validateUUID(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid UUID format'
            });
        }

        if(!ALLOWED_ROLES.includes(newRole) || !newRole) {
            return res.status(400).json({
                success: false,
                message: `invalid role. allowed roles: ${ALLOWED_ROLES.join(', ')}`,
            })
        }

        const userExist = await findUserId(userId)
        if(!userExist){
            return res.status(404).json({
                success: false,
                message: "user was not found"
            })
        }

        const updatedUser = await updateRoleUserPatch(userId, newRole)
        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        })
    } catch (error) {
        console.error('Error while updating user', error);
        res.status(500).json({
            success: false,
            message: 'error while updating the users role',
            error: error.message
        })
    }
}

module.exports = updateRoleUserController
