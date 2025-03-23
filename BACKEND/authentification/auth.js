const express = require('express')
const validateToken =  require('../utils/jwt/validateToken')

const router = express.Router()

router.use(async(req, res, next) => {
    const token = req.headers['authorization'];
    const jwToken = token && token.split(' ')[1]

    if(!jwToken){
        return res.status(401).send({error: 'Invalid Token'})
    }

    try {
        const decodedToken = validateToken(jwToken)
        res.locals.user = decodedToken
        next()
    } catch (error) {
        console.error('Token validation could not work: ', error)
        return res.status(401).send({error: 'Unauthorized'})
    }
})

module.exports = router
