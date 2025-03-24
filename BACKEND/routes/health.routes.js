const express = require('express');
const router = express.Router();

const healthGetController = require('../controllers/health/health.get.controller');

router.get('/health', async (req, res) => {
    await healthGetController(req, res);
});

module.exports = router;
