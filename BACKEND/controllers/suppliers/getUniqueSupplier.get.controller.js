const findUniqueSupplier = require('../../services/suppliers.services').getSupplierById
const {validateUUID} = require('../../utils/regex/validators')

const getUniqueSupplierController = async (req, res) => {
    const {id} = req.params

    if (!validateUUID(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid UUID format',
            error_code: 'INVALID_UUID',
        })
    }

    try {
        const supplier = await findUniqueSupplier(id)
        if(!supplier) {
            return res.status(404).json({
                success: false,
                message: 'supplier not found',
                error_code: 'INVALID_SUPPLIER',
            })
        }

        const reponseData = {
            id: supplier.id,
            name: supplier.name,
            contact_email: supplier.contact_email,
            phone: supplier.phone,
            address: supplier.address,
            created_at: supplier.created_at,
        }
        return res.status(200).json({
            success: true,
            data: reponseData,
        })
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error :`, error)
        return res.status(500).json({
            success: false,
            message: 'Error :',
            error_code: 'SERVER_ERROR',
            ...(process.env.NODE_ENV === 'production' && {
                debug: error.message
            })
        })
    }
}

module.exports = getUniqueSupplierController;
