const { validateUUID } = require('../../utils/regex/validators');
const {validateCategoryName} = require("../../utils/regex/Validators.category");
const createCategory = require('../../services/categories.services').createCategory
const findCategoryWhereName = require('../../services/categories.services').findCategoryWhereName

const createCategoryController = async (req, res) => {
    const { name } = req.body;

    if(!validateCategoryName(name)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Category Name',
            error_code: 'INVALID_NAME',
        })
    }

    try {
        const existingCategory = await findCategoryWhereName(name);
        if(existingCategory) {
            return res.status(409).json({
                success: false,
                message: 'Category already exists',
                error_code: 'CATEGORY_EXISTS',
            })
        }

        const newCategory = await createCategory({name})

        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: {
                id: newCategory.id,
                name: newCategory.name,
                created_at: newCategory.created_at,
            }
        })
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error:`, error);
        return res.status(500).json({
            success: false,
            message: 'Error while creating a new category',
            error_code: 'SERVER_ERROR',
            ...(process.env.NODE_ENV === 'development' && {
                debug: error.message
            })
        });
    }
}
