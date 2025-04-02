const updateProduct = require('../../services/product.services').updateProduct;
const findProductWhereId = require('../../services/product.services').findProductWhereId;
const findProductWhereName = require('../../services/product.services').findProductWhereName;
const {validateProductInput} = require('../../utils/regex/product.validators');
const {checkRole} = require('../../authentification/roleHierarchy');

const updateProductController = async (req, res) => {
    const roleCheck = checkRole(['admin', 'manager']);
    roleCheck(req, res, async () => {
        const {id} = req.params
        const updateData = req.body
        const { isValid, errors, validatedData } = validateProductInput(updateData);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "données invalides",
                errors
            })
        }

        try {
            const existingProduct = await findProductWhereId(id);
            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: "product not found",
                    productId: id
                })
            }
            if (validatedData.sku && validatedData.sku !== existingProduct.sku) {
                const skuExists = await findProductWhereSku(validatedData.sku);
                if (skuExists) {
                    return res.status(409).json({
                        success: false,
                        message: "Un produit avec ce SKU existe déjà",
                        sku: validatedData.sku
                    });
                }
            }

            // 5. Mise à jour du produit
            const updatedProduct = await updateProduct(id, {
                ...validatedData,
                updated_by: req.user.id // Trace de la modification
            });

            // 6. Réponse formatée
            return res.status(200).json({
                success: true,
                message: "Produit mis à jour avec succès",
                data: formatProductResponse(updatedProduct),
                updatedBy: {
                    userId: req.user.id,
                    role: req.user.role
                }
            });
        } catch (error) {
            console.error(`[PATCH Product Error] ${error.message}`);
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la mise à jour du produit",
                errorCode: "PRODUCT_UPDATE_FAILED",
                ...(process.env.NODE_ENV === 'development' && {
                    systemError: error.message,
                    stack: error.stack
                })
            });
        }
    })
}

const formatProductResponse = (product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    description: product.description || null,
    quantity: product.quantity,
    min_stock_alert: product.min_stock_alert,
    supplierId: product.supplier_id || null,
    categoryId: product.category_id || null,
    createdAt: product.created_at,
    updatedAt: product.updated_at
});

module.exports = updateProductController;
