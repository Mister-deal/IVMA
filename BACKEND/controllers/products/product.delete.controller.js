const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const { checkRole } = require('../../authentification/roleHierarchy');
const { validateProductInput } = require('../../utils/regex/product.validators');
const uploadPathQrCodeProduits = process.env.UPLOADPATHQRCODEPRODUITS || './uploads/qrcodes/';
const suffixImg = require('../../utils/enum/suffixImg');

const {
    findAllMovementsWhereProductId,
    removeMovement
} = require('../../services/movements.services');

const {
    findProductWhereId,
    findProductWhereName,
    removeProduct
} = require('../../services/product.services');

const deleteProductController = async (req, res) => {
    // 1. Vérification du rôle et de l'authentification
    const roleCheck = checkRole(['admin', 'manager']);
    roleCheck(req, res, async () => {
        const { id } = req.params;
        const tokenId = res.locals?.user?.id;

        // 2. Validation UUID si nécessaire
        if (!uuid.validate(tokenId)) {
            return res.status(401).json({
                success: false,
                message: 'Non autorisé : Token invalide'
            });
        }

        try {
            // 3. Vérification de l'existence du produit
            const product = await findProductWhereId(id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Produit non trouvé",
                    productId: id
                });
            }

            // 4. Suppression des mouvements associés
            const associatedMovements = await findAllMovementsWhereProductId(id);
            if (associatedMovements.length > 0) {
                await Promise.all(
                    associatedMovements.map(movement =>
                        removeMovement(movement.id)
                    )
                );
            }

            // 5. Suppression du fichier QR Code si existant
            if (product.qr_code) {
                const qrCodePath = path.join(uploadPathQrCodeProduits, product.qr_code);
                if (fs.existsSync(qrCodePath)) {
                    fs.unlinkSync(qrCodePath);
                }
            }

            // 6. Suppression du produit
            await removeProduct(id);

            // 7. Réponse de succès
            return res.status(200).json({
                success: true,
                message: "Produit supprimé avec succès",
                metadata: {
                    deletedBy: tokenId,
                    deletedAt: new Date().toISOString(),
                    deletedMovementsCount: associatedMovements.length,
                    qrCodeDeleted: !!product.qr_code
                }
            });

        } catch (error) {
            console.error(`[DELETE Product Error] ${error.message}`);
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la suppression du produit",
                errorCode: "PRODUCT_DELETION_FAILED",
                ...(process.env.NODE_ENV === 'development' && {
                    systemError: error.message,
                    stack: error.stack
                })
            });
        }
    });
};

module.exports = deleteProductController;
