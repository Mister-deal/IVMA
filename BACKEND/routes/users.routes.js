const express = require('express');
const router = express.Router();
const auth = require('../authentification/auth');


const registerPostController = require('../controllers/users/register.post.controller')
const loginPostController = require('../controllers/users/login.post.controller')
const userAllGetController = require('../controllers/users/usersAll.get.controller')
const userUniqueGetController = require('../controllers/users/userUnique.get.controller')
const updateUserPatchController = require('../controllers/users/updateProfilUser.patch.controller')
const updateUsersPatchController = require('../controllers/users/updateRoleUser.patch.controller')
const deleteUserController = require('../controllers/users/user.delete.controller')



router.post('/register', auth, async (req, res) => {
    await registerPostController(req, res);
})
router.post('/login', auth, async (req, res) => {
    await loginPostController(res, res)
})

router.get('/users', auth, async (req, res) => {
    await userAllGetController(req, res)
})

router.get('/user/:id', auth, async (req, res) => {
    await userUniqueGetController(req, res)
})

router.patch('/user/:pseudo/password', auth, async (req, res) => {
    await updateUserPatchController(req, res)
})

router.patch('/user/:pseudo', auth, async (req, res) => {
    await updateUsersPatchController(req, res)
})

router.delete('/user/:pseudo', auth, async (req, res) => {
    await deleteUserController(req, res)
})

router.get('/logout', (req, res) => {
    res.clearCookie('access_token')
    return res.json({ Status: 'Success' })
})

module.exports = router
