const express = require('express');
const router = express.Router();

const askResetPassword = require('../controllers/resetPassword/askResetPassword.post.controller')
const resetPassword = require('../controllers/resetPassword/resetPassword.patch.controller')

router.post('/resetPassword', async (req, res) =>{
    await askResetPassword( req, res);
})

router.patch('/resetPassword/:id', async (req, res) =>{
    await resetPassword( req, res);
})

module.exports = router;
