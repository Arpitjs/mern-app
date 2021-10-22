let express = require('express')
let router = new express.Router()
let authController = require('../controllers/authController')

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword)

router.post('/resetPassword', authController.resetPassword)

router.get('/current-user', authController.protect, authController.currentUser)

module.exports = router