/**
 * Valide les données de création de produit
 */
const validateProductInput = (input) => {
    const errors = {};
    let isValid = true;

    // Validation du nom (obligatoire, min 2 caractères)
    if (!input.name || input.name.trim().length < 2) {
        errors.name = "Le nom doit contenir au moins 2 caractères";
        isValid = false;
    }

    // Validation du SKU (obligatoire, min 3 caractères)
    if (!input.sku || input.sku.trim().length < 3) {
        errors.sku = "Le SKU doit contenir au moins 3 caractères";
        isValid = false;
    }

    // Validation de la quantité (nombre entier positif)
    if (input.quantity && (isNaN(input.quantity) || parseInt(input.quantity) < 0)) {
        errors.quantity = "La quantité doit être un nombre positif";
        isValid = false;
    }

    // Validation de l'alerte stock (nombre entier positif)
    if (input.min_stock_alert && (isNaN(input.min_stock_alert) || parseInt(input.min_stock_alert) < 1)) {
        errors.min_stock_alert = "L'alerte de stock doit être au moins 1";
        isValid = false;
    }

    return {
        isValid,
        errors,
        validatedData: {
            ...input,
            quantity: parseInt(input.quantity) || 0,
            min_stock_alert: parseInt(input.min_stock_alert) || 5
        }
    };
};

module.exports = { validateProductInput };
