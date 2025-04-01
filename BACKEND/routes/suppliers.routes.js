const express = require('express');
const router = express.Router();
const auth = require('../authentification/auth')

const supplierPostController = require('../controllers/suppliers/supplier.post.controller');
const supplierPatchController = require('../controllers/suppliers/supplier.patch.controller');
const supplierGetController = require('../controllers/suppliers/getUniqueSupplier.get.controller');
const suppliersGetAllController = require('../controllers/suppliers/getAllSuppliers.get.controller');
const supplierDeleteController = require('../controllers/suppliers/supplier.delete.controller');


