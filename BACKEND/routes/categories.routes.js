const express = require('express');
const router = express.Router();
const auth =  require('../authentification/auth.js');

const categoryPostController = require('../controllers/categories/category.post.controller');
const categoryPatchController = require('../controllers/categories/category.patch.controller');
const categoryDeleteController = require('../controllers/categories/category.delete.controller');
const categoryGetController = require('../controllers/categories/singleCategory.get.controller');
const categoriesGetController = require('../controllers/categories/categoriesAll.get.controller');



router.post('/category', auth, async (req, res) => {
    await categoryPostController(req, res)
})
router.patch('/category/:id', auth, async (req, res) => {
    await categoryPatchController(req, res)
})
router.get('/categories', auth, async (req, res) => {
    await categoriesGetController(req, res)
})
router.get('/category/:id', auth, async (req, res) => {
    await categoryGetController(req, res)
})
router.delete('/category/:id', auth, async (req, res) => {
    await categoryDeleteController(req, res)
})

module.exports = router
