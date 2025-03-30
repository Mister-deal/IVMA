const path = require('path');
const { findProductWhereId } = require('../../services/product.services');

const productsQrCodeGetController = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await findProductWhereId(productId);

        if (!product || !product.qr_code) {
            return res.status(404).json({
                success: false,
                message: 'QR code non trouvé pour ce produit',
                error_code: 'QRCODE_NOT_FOUND'
            });
        }

        const imagePath = path.join(
            __dirname,
            '../../images/produits/',
            product.qr_code
        );

        // Vérification que le fichier existe
        const fs = require('fs');
        if (!fs.existsSync(imagePath)) {
            throw new Error('Fichier QR code introuvable');
        }

        // Envoi du fichier avec en-têtes appropriés
        res.sendFile(imagePath, {
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=86400' // Cache 24h
            }
        });

    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erreur QR code:`, error);

        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération du QR code',
            error_code: 'SERVER_ERROR',
            ...(process.env.NODE_ENV === 'development' && {
                debug: error.message
            })
        });
    }
};

module.exports = productsQrCodeGetController;
