const createSupplier = require('../../services/suppliers.services').createSupplier;
const findSupplierWhereName = require('../../services/suppliers.services').getSupplierByName;
const {validateSupplierName} = require('../../utils/regex/Validators.category').validateSupplierName;

const createSupplierController = async (req, res) => {
    const { name } = req.body;

    if(!validateSupplierName(name)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Supplier Name',
            error_code: 'INVALID_NAME',
        });
    }

    try {
        const existingSupplier = await findSupplierWhereName(name);
        if(existingSupplier) {
            return res.status(409).json({
                success: false,
                message: 'Supplier already exists',
                error_code: 'SUPPLIER_EXISTS',
            })
        }

        const newSupplier = await createSupplier({name})
        return res.status(201).json({
            success: true,
            message: 'Supplier created successfully',
            data: {
                id: newSupplier.id,
                name: newSupplier.name,
                contact_email: newSupplier.contact_email,
                phone: newSupplier.phone,
                created_at: newSupplier.created_at,
            }
        })
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error:`, error);
        return res.status(500).json({
            success: false,
            message: 'Error while retrieving the suppliers:',
            error: 'SERVER_ERROR',
            ...(process.env.NODE_ENV === 'development' && {
                debug: error.message
            })
        })
    }
}

module.exports = createSupplierController;
