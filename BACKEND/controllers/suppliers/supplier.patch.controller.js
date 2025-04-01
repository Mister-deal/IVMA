const findSupplierWhereId  = require('../../services/suppliers.services').getSupplierById
const updateSupplier  = require('../../services/suppliers.services').updateSupplier
const findSupplierByName  = require('../../services/suppliers.services').getSupplierByName
const {validateUUID} = require('../../utils/regex/validators');
const {validateSupplierName} = require('../../utils/regex/Validators.category');

const patchSupplierController = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    if(!validateUUID(id)) {
        return res.status(400).json({
            success: false,
            message: "invalid id",
            error_code: 'INVALID_UUID',
        })
    }

    if(!validateSupplierName(name)) {
        return res.status(400).json({
            success: false,
            message: "le nom doit contenir entre 2 et 50 caractères",
            error_code: 'INVALID_SUPPLIER',
        })
    }

    try {
        const supplier = await findSupplierWhereId(id)
        if(!supplier) {
            return res.status(404).json({
                success: false,
                message: 'supplier not found',
                error_code: 'NOT_FOUND',
            })
        }

        if(name !== supplier.name) {
            const existingSupplier = await findSupplierByName(name)
            if(existingSupplier) {
                return res.status(409).json({
                    success: false,
                    message: 'Supplier already exists',
                    error_code: 'NAME_EXISTS',
                })
            }
        }

        const updatedSupplier = await updateSupplier(id, {name})

        return res.status(200).json({
            success: true,
            message: 'Supplier updated successfully',
            data: {
                id: updatedSupplier.id,
                name: updatedSupplier.name,
                contact_email: updatedSupplier.contact_email,
                phone: updatedSupplier.phone,
            }
        })
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error:`, error);
        return res.status(500).json({
            success: false,
            message: 'Error:',
            error_code: 'SERVER_ERROR'
        })
    }
}

module.exports = patchSupplierController
