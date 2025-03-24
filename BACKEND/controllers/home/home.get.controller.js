const uuid = require('uuid')

const findUserWherePseudo = require('../../services/users.services').findUserWherePseudo

const findAllCategories = require('../../services/categories.services').findAllCategories
const findAllProducts = require('../../services/product.services').findAllProducts
const findAllMovements = require('../../services/movements.services').findAllMovements
const findAllUsers = require('../../services/users.services').findAllUsers

const homeController = async (req, res) => {
    const validate = uuid.validate

    const tokenId = res.locals.user.userId
    const tokenPseudo = res.locals.user.pseudo
    console.log('test', res.locals.user)

    if(!validate(tokenId)){
        return res.status(401).json({message: 'Invalid token'})
    }

    const categories = await findAllCategories()
    const products = await findAllProducts()
    const movements = await findAllMovements()
    const users = await findAllUsers()


    try {
        const user = await findUserWherePseudo(tokenPseudo)
        return res.status(200).json({
            pseudo: user.pseudo,
            role: user.role,
            id: user.users_id,
            categories: categories,
            movements: movements,
            products: products,
            users,
        })
    } catch (error) {
        return res.status(500).json({message: 'Error: didnt get to retrieve informations'})
    }
}
module.exports = homeController
