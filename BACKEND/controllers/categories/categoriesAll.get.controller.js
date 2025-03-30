const findAllCategories = require("../../services/categories.services").findAllCategories
const findCategoryWhereId = require("../../services/categories.services").findCategoryWhereId
const {validateUUID} = require("../../utils/regex/validators")
const getAllCategoriesController = async (req, res) => {
    try {
        const { id } = req.params

        if(id) {
            if (!validateUUID(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Category ID',
                })
            }
        }

        const category = await findCategoryWhereId(id)
        if(!category) {
            return res.status(400).json({
                success: false,
                message: 'category not found',
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                id: category.id,
                name: category.name,
                created_at: category.created_at,
                updated_at: category.updated_at,
            }
        })

        const categories = await findAllCategories()
        return res.status(200).json({
            success: true,
            count: categories.length,
            data: categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                created_at: cat.created_at,
                updated_at: cat.updated_at,
            }))
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'error while retrieving the categories',
        })
    }

}

module.exports = getAllCategoriesController;
