const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const productsQrCodeGetController = require('../controllers/products/qrCode.get.controller');
const { validateUUID } = require('../middlewares/validators');

// Route protégée pour récupérer un QR code
router.get(
    '/products/:id/qrcode',
    auth,                     // Authentification requise
    validateUUID,             // Validation du format UUID
    productsQrCodeGetController
);

module.exports = router;
