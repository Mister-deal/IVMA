const express = require('express');
const router = express.Router();
const auth = require('../authentification/auth');
const { validateUUID } = require('../utils/regex/validators');
const productsQrcodeGetController = require('../controllers/QrCodes/productQRCode.get.controller');

// Route protégée pour récupérer un QR code
router.get(
    '/qrCodeProduct/:id',
    auth,                     // Authentification requise
    validateUUID,             // Validation du format UUID
    productsQrcodeGetController,
);

module.exports = router;
