const express = require('express');
const router = express.Router();
const auth = require('../authentification/auth')
const homeGetController = require('../controllers/home/home.get.controller');

router.get('/', auth, async (req, res) => {
    await homeGetController(req, res);
});

module.exports = router;
