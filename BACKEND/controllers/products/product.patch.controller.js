const { updateProduct, findProductWhereId, findProductWhereSku, findProductWhereName } = require('../../services/product.services');
const { validateProductInput } = require('../../utils/regex/product.validators');
const { checkRole } = require('../../authentification/roleHierarchy');
const { findCategoryWhereName } = require('../../services/categories.services');
const uuid = require('uuid');

const updateProductController = async (req, res) => {
    // 1. Vérification du rôle et de l'authentification
    const validate = uuid.validate;
    const tokenId = res.locals?.user?.userId;
    const tokenRole = res.locals?.user?.role;

    if (!validate(tokenId)) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (tokenRole === checkRole.USER) {
        return res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges' });
    }

    // 2. Récupération des données
    const { id } = req.params;
    const updateData = req.body;
    const { stock_mini, category, quantity, ...otherData } = updateData;

    // 3. Validation des données
    const { isValid, errors, validatedData } = validateProductInput({
        ...otherData,
        quantity,
        min_stock_alert: stock_mini
    });

    if (!isValid) {
        return res.status(400).json({
            success: false,
            message: "Données invalides",
            errors
        });
    }

    try {
        // 4. Vérification de l'existence du produit
        const existingProduct = await findProductWhereId(id);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Produit non trouvé",
                productId: id
            });
        }

        // 5. Vérification de la catégorie si fournie
        let categoryId = null;
        if (category) {
            categoryId = await findCategoryWhereName(category);
            if (!categoryId) {
                return res.status(404).json({
                    success: false,
                    message: "Catégorie non trouvée",
                    category
                });
            }
        }

        // 6. Vérification de l'unicité du SKU si modifié
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

        // 7. Préparation des données de mise à jour
        const updatePayload = {
            ...validatedData,
            updated_by: tokenId
        };

        if (category) {
            updatePayload.category_id = categoryId.categories_id;
        }

        if (stock_mini !== undefined) {
            updatePayload.min_stock_alert = parseInt(stock_mini);
        }

        if (quantity !== undefined) {
            updatePayload.quantity = parseInt(quantity);
        }

        // 8. Mise à jour du produit
        const updatedProduct = await updateProduct(id, updatePayload);

        // 9. Réponse formatée
        return res.status(200).json({
            success: true,
            message: "Produit mis à jour avec succès",
            data: {
                id: updatedProduct.id,
                name: updatedProduct.name,
                sku: updatedProduct.sku,
                description: updatedProduct.description || null,
                quantity: updatedProduct.quantity,
                min_stock_alert: updatedProduct.min_stock_alert,
                categoryId: updatedProduct.category_id || null,
                supplierId: updatedProduct.supplier_id || null,
                updatedAt: updatedProduct.updated_at
            },
            metadata: {
                updatedBy: tokenId,
                role: tokenRole,
                timestamp: new Date().toISOString()
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
};

module.exports = updateProductController;
