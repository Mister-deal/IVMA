const uuid = require('uuid');
const findUniqueProductByName = require('../../services/product.services').findProductWhereName;
const findAllMovementsByProducts = require('../../services/movements.services').findAllMovementsWhereProductId;

const productUniqueNameController = async (req, res) => {
    const validate = uuid.validate;

    const tokenId = res.locals.user.id

    const productName = req.params.name
    console.log(productName)
    console.log(tokenId)

    if (!validate(tokenId)) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const product = await findUniqueProductByName(productName)
        const allMovementsByProducts = await findAllMovementsByProducts(
            product.id
        )
        return res.status(200).json({ product, allMovementsByProducts })
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'error while trying to find the product' })
    }
}

module.exports = productUniqueNameController
