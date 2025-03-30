const findCategoryUnique = require('../../services/categories.services').findCategoryWhereId
const { validateUUID } = require('../../utils/regex/validators')

const getUserUniqueController = async (req, res) => {
    const {id} = req.params

    if(!validateUUID(id)) {
        return res.status(400).send({
            success: false,
            message: 'Invalid UUID format',
            error_code: 'INVALID_UUID',
        })
    }

    try {
        const category = await findCategoryUnique(id)
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'category not found',
                error_code: 'INVALID_CATEGORY',
            })
        }

        const reponseData = {
            id: category.id,
            name: category.name,
            created_at: category.created_at,
            updated_at: category.updated_at,
        }

        return res.status(200).json({
            success: true,
            data: reponseData
        })
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error :`, error)
        return res.status(500).json({
            success: false,
            message: 'Erreur:',
            error_code: 'SERVER_ERROR',
            ...(process.env.NODE_ENV === 'development' && {
                debug: error.message
            })
        })
    }
}

module.exports = getUserUniqueController;
