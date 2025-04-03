const { createProduct, findProductWhereSku, findProductWhereName, updateQRCode } = require('../../services/product.services');
const { validateProductInput } = require('../../utils/regex/product.validators');
const { checkRole } = require('../../authentification/roleHierarchy');
const QRCode = require('qrcode');
const path = require('path');
const uploadPath = require('../../utils/enum/uploadPath');
const suffixImg = require('../../utils/enum/suffixImg');

const createProductController = async (req, res) => {
    // 1. Vérification du rôle
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
            // 3. Vérification de l'unicité
            const [existingBySku, existingByName] = await Promise.all([
                findProductWhereSku(validatedData.sku),
                findProductWhereName(validatedData.name)
            ]);

            if (existingBySku) {
                return res.status(409).json({
                    success: false,
                    message: "Un produit avec ce SKU existe déjà",
                    sku: validatedData.sku,
                    existingProductId: existingBySku.id
                });
            }

            if (existingByName) {
                return res.status(409).json({
                    success: false,
                    message: "Un produit avec ce nom existe déjà",
                    name: validatedData.name,
                    existingProductId: existingByName.id
                });
            }

            // 4. Création du produit
            const newProduct = await createProduct({
                ...validatedData,
                created_by: req.user.id,
                updated_by: req.user.id,
                qr_code: '' // Initialisé vide
            });

            // 5. Génération et sauvegarde du QR Code
            try {
                const qrCodeFileName = `${newProduct.id}${suffixImg}`;
                const qrCodeFullPath = path.join(uploadPath.QR_CODE_PRODUITS, qrCodeFileName);

                await QRCode.toFile(qrCodeFullPath, newProduct.id.toString(), {
                    quality: 1,
                    width: 150
                });

                // Mise à jour du produit avec le QR Code
                await updateQRCode(newProduct.id, { qr_code: qrCodeFileName });
                newProduct.qr_code = qrCodeFileName;

            } catch (qrError) {
                console.error(`[QR Code Generation Error] ${qrError.message}`);
                newProduct.qr_code = 'generation_error';
                // On continue même si le QR Code échoue
            }

            // 6. Réponse formatée
            return res.status(201).json({
                success: true,
                message: "Produit créé avec succès",
                data: formatProductResponse(newProduct),
                metadata: {
                    createdBy: req.user.id,
                    role: req.user.role,
                    timestamp: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error(`[Product Creation Error] ${error.message}`);
            return res.status(500).json({
                success: false,
                message: "Erreur système lors de la création",
                systemError: process.env.NODE_ENV === 'development' ? {
                    message: error.message,
                    stack: error.stack
                } : undefined,
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
    description: product.description,
    quantity: product.quantity,
    min_stock_alert: product.min_stock_alert,
    qr_code: product.qr_code ? {
        filename: product.qr_code,
        url: `/qrcodes/${product.qr_code}` // Vous pouvez adapter cette URL selon votre routing
    } : null,
    supplier: product.supplier_id ? { id: product.supplier_id } : null,
    category: product.category_id ? { id: product.category_id } : null,
    timestamps: {
        createdAt: product.created_at,
        updatedAt: product.updated_at
    }
});

module.exports = createProductController;
