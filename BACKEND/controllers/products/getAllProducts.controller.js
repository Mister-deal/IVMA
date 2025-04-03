const findAllCategories = require('../../services/categories.services').findAllCategories;
const uuid = require('uuid');
const {findAllProducts} = require("../../services/product.services");

const getAllProductsController = async (req, res) => {
    const validate = uuid.validate

    const tokenId = res.locals.user.id

    if (!validate(tokenId)) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const products = await findAllProducts();
        const categories = await findAllCategories()
        return res.status(200).json({products, categories})
    } catch (error) {
        return res.status(500).json({ message: 'error find all product' })
    }
}

module.exports = getAllProductsController
