const findAllSuppliers = require('../../services/suppliers.services').getAllSuppliers;
const findSupplierWhereId = require('../../services/suppliers.services').getSupplierById
const {validateUUID} = require('../../utils/regex/validators');

const getAllSuppliersController = async (req, res) => {
    try {
        const {id} = req.params;

        if(id) {
            if (!validateUUID(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid UUID format',
                })
            }
        }
        const supplier =  await findSupplierWhereId(id)
        if(!supplier) {
            return res.status(400).json({
                success: false,
                message: 'The supplier was not found',
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                id: supplier.id,
                name: supplier.name,
                contact_email: supplier.contact_email,
                phone: supplier.phone,
                address: supplier.address,
                created_at: supplier.created_at,
            }
        })

        const suppliers = await findAllSuppliers()
        return res.status(200).json({
            success: true,
            count: suppliers.length,
            data: suppliers.map(sup => ({
                id: sup.id,
                name: sup.name,
                contact_email: sup.contact_email,
                phone: sup.phone,
                address: sup.address,
                created_at: sup.created_at,
            }))
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error while retrieving the suppliers:', error: error
        })
    }
}

module.exports = getAllSuppliersController;
