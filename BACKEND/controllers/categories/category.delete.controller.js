const findCategoryWhereId = require('../../services/categories.services').findCategoryWhereId
const removeCategory = require('../../services/categories.services').removeCategory
const {validateUUID} = require('../../utils/regex/validators')

const deleteCategoryController = async (req, res) => {
    const {id} = req.params

    if(!validateUUID(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid UUID format',
            error_code: 'INVALID_ID',
        })
    }

    try {
        const category = await findCategoryWhereId(id)
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'category not found',
                error_code: 'NOT_FOUND',
            })
        }

        if(category.products && category.products.length > 0){
            return res.status(400).json({
                success: false,
                message: 'impossible to delete : category used by products',
                error_code: 'CATEGORY_IN_USE',
                products_count: category.products.length,
            })
        }

        await removeCategory(id)
        return res.status(200).json({
            success: true,
            message: 'Category deleted',
            deleted_id: id,
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erreur suppression :`, error);

        // Gestion spécifique des contraintes Prisma
        if (error.code === 'P2003') {
            return res.status(400).json({
                success: false,
                message: 'Suppression bloquée : existence de produits liés',
                error_code: 'FOREIGN_KEY_CONSTRAINT'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la suppression',
            error_code: 'SERVER_ERROR'
        });
    }
}

module.exports = deleteCategoryController;
