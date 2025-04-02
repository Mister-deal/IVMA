const express = require('express');
const router = express.Router();
const auth = require('../authentification/auth')

const supplierPostController = require('../controllers/suppliers/supplier.post.controller');
const supplierPatchController = require('../controllers/suppliers/supplier.patch.controller');
const supplierGetController = require('../controllers/suppliers/getUniqueSupplier.get.controller');
const supplierDeleteController = require('../controllers/suppliers/supplier.delete.controller');
const suppliersGetController = require('../controllers/suppliers/getAllSuppliers.get.controller');


router.post('/supplier', auth, async (req, res) => {
    await supplierPostController(req, res);
})
router.get('/supplier/:id', auth, async (req, res) => {
    await supplierGetController(req, res);
})

router.get('/suppliers', auth, async (req, res) => {
    await suppliersGetController(req, res);
})

router.delete('/supplier/:id', auth, async (req, res) => {
    await supplierDeleteController(req, res);
})

router.patch('/supplier/:id', auth, async (req, res) => {
    await supplierPatchController(req, res);
})
