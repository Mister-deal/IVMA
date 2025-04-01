const findSupplierWhereId = require('../../services/suppliers.services').getSupplierById
const removeSupplier = require('../../services/suppliers.services').deleteSupplier
const {validateUUID} = require('../../utils/regex/validators')

const deleteSupplierController = async (req, res) => {
    const {id} = req.params

    if (!validateUUID(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid UUID format',
            error_code: 'INVALID_UUID',
        })
    }

    try {
        const supplier = await findSupplierWhereId(id)
        if (!supplier) {
            return res.status(400).json({
                success: false,
                message: 'supplier not found',
                error_code: 'NOT_FOUND',
            })
        }

        await removeSupplier(id)
        return res.status(200).json({
            success: true,
            message: 'successfully deleted',
            data: {
                deleteSupplier: {
                    id: supplier.id,
                    name: supplier.name,
                    contact_email: supplier.contact_email,
                    phone: supplier.phone,
                    address: supplier.address,
                },
                deletedAt: new Date().toISOString(),
            }
        })
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error:`, error);
        return res.status(500).json({
            success: false,
            message: 'Error lors de la suppression du supplier:',
            error_code: 'SERVER_ERROR',
            ...(process.env.NODE_ENV === 'development' && {
                debug: error.message
            })
        })
    }
}

module.exports = deleteSupplierController
