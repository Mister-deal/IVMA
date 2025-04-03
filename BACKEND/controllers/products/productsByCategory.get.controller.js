const uuid = require('uuid');

const findAllProductsByCategory= require('../../services/product.services').findAllProductsWhereCategory;

const allProductsByCategoryGetController = async (req, res) => {
    const validate = uuid.validate;

    const tokenId = res.locals.user.id

    if (!validate(tokenId)) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const products = await findAllProductsByCategory()
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: 'error find all product' })
    }
}

module.exports = allProductsByCategoryGetController
