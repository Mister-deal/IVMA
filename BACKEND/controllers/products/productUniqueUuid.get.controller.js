const uuid = require('uuid/v4');

const findUniqueProductById = require('../../services/product.services').findProductWhereId;
const findCategoryByProduct = require('../../services/categories.services').findCategoryWhereId;
const findAllUsers = require('../../services/users.services').findAllUsers;
const findAllMovementsByProducts = require('../../services/movements.services').findAllMovementsWhereProductId;

const productUniqueUuidGetController = async (req, res) => {
    const validate = uuid.validate

    const tokenId = res.locals.user.id

    const productId = req.params.id

    if (!validate(tokenId)) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const product = await findUniqueProductById(productId)
        const category = await findCategoryByProduct(product.categoryId)
        const users = await findAllUsers()
        const movements = await findAllMovementsByProducts(product.id)
        return res.status(200).json({
            product,

            category,
            users,
            movements,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'fail' })
    }
}

module.exports = productUniqueUuidGetController
