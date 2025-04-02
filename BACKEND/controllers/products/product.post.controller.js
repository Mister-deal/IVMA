const { createProduct, findProductWhereSku, findProductWhereName } = require('../../services/product.services');
const { validateProductInput } = require('../../utils/regex/product.validators');
const { checkRole } = require('../../authentification/roleHierarchy');

const createProductController = async (req, res) => {
    // 1. Vérification du rôle avec votre système hiérarchique
    const roleCheck = checkRole(['admin', 'manager']);
    roleCheck(req, res, async () => {
        // 2. Validation des données
        const { isValid, errors, validatedData } = validateProductInput(req.body);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Données invalides",
                errors
            });
        }

        try {
            // 3. Vérification de l'unicité du SKU
            const existingProduct = await findProductWhereSku(validatedData.sku);
            if (existingProduct) {
                return res.status(409).json({
                    success: false,
                    message: "Un produit avec ce SKU existe déjà",
                    sku: validatedData.sku,
                    existingProductId: existingProduct.id
                });
            }
            const existingPRoduct = await findProductWhereSku(validatedData.name);
            if (existingPRoduct) {
                return res.status(409).json({
                    success: false,
                    message: "Un produit avec ce nom existe déjà",
                    sku: validatedData.name,
                    existingProductId: existingProduct.id
                })
            }

            // 4. Création du produit avec trace de l'utilisateur
            const newProduct = await createProduct({
                ...validatedData,
                created_by: req.user.id,
                updated_by: req.user.id
            });

            // 5. Réponse formatée
            return res.status(201).json({
                success: true,
                message: "Produit créé avec succès",
                data: formatProductResponse(newProduct),
                createdBy: {
                    userId: req.user.id,
                    role: req.user.role
                }
            });

        } catch (error) {
            console.error(`[Product Creation Error] ${error.message}`);
            return res.status(500).json({
                success: false,
                message: "Erreur système lors de la création",
                systemError: process.env.NODE_ENV === 'development' ? error.message : undefined,
                errorCode: "PRODUCT_CREATION_FAILED"
            });
        }
    });
};

// Helper pour formater la réponse
const formatProductResponse = (product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    description: product.description || null,
    quantity: product.quantity,
    min_stock_alert: product.min_stock_alert,
    supplier: product.supplier_id ? { id: product.supplier_id } : null,
    category: product.category_id ? { id: product.category_id } : null,
    createdAt: product.created_at,
    updatedAt: product.updated_at
});

module.exports = createProductController;
