const express = require('express');
const router = express.Router();
const auth = require('../authentification/auth');


const loginPostController = require('../controllers/users/login.post.controller');
const registerPostController = require('../controllers/users/register.post.controller');

router.post('/register', auth, async (req, res) => {
    await registerPostController(req, res);
})
router.post('/login', auth, async (req, res) => {
    await loginPostController(res, res)
})

router.get('/logout', (req, res) => {
    res.clearCookie('access_token')
    return res.json({ Status: 'Success' })
})

module.exports = router
