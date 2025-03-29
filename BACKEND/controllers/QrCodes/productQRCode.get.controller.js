const path = require('path')

const findUniqueProductById =
    require('../../services/product.services').findProductWhereId

const productsQrCodeGetController = async (req, res) => {
    const productId = req.params.id
    console.log('id', req.params)

    try {
        const product = await findUniqueProductById(productId)
        const imageName = product.qr_code
        let filePath = path.join(
            __dirname,
            '../../images/produits/',

            imageName
        )
        res.sendFile(`${filePath}`)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Cannot find qrCode' })
    }
}

module.exports = productsQrCodeGetController
