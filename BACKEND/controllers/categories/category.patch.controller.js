const { updateCategory, findCategoryWhereId, findCategoryWhereName } = require('../../services/categories.services');
const { validateUUID } = require('../../utils/regex/validators');
const { validateCategoryName } = require('../../utils/regex/Validators.category');

const patchCategoryController = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    // 1. Validations
    if (!validateUUID(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de catégorie invalide',
            error_code: 'INVALID_ID'
        });
    }

    if (!validateCategoryName(name)) {
        return res.status(400).json({
            success: false,
            message: 'Le nom doit contenir entre 2 et 50 caractères',
            error_code: 'INVALID_NAME'
        });
    }

    try {
        // 2. Vérification existence catégorie
        const category = await findCategoryWhereId(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Catégorie non trouvée',
                error_code: 'NOT_FOUND'
            });
        }

        // 3. Vérification unicité nouveau nom
        if (name !== category.name) {
            const existingCategory = await findCategoryWhereName(name);
            if (existingCategory) {
                return res.status(409).json({
                    success: false,
                    message: 'Ce nom de catégorie existe déjà',
                    error_code: 'NAME_EXISTS'
                });
            }
        }

        // 4. Mise à jour
        const updatedCategory = await updateCategory(id, { name });

        return res.status(200).json({
            success: true,
            message: 'Catégorie mise à jour',
            data: {
                id: updatedCategory.id,
                name: updatedCategory.name,
                updated_at: updatedCategory.updated_at
            }
        });

    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erreur mise à jour :`, error);
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la mise à jour',
            error_code: 'SERVER_ERROR'
        });
    }
};

module.exports = patchCategoryController;
