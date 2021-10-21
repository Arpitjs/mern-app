let express = require('express')
let router = new express.Router()
let formidable = require('express-formidable')
let authController = require('../controllers/authController')
let userController = require('../controllers/userController')
let { uploadImage } = require('../utils/Image')

router.get('/find-people', 
authController.protect, userController.findPeople)

router.get('/search', 
authController.protect, userController.searchUser)

router.get('/fetch-user/:username', 
authController.protect, userController.fetchUser)

router.get('/user-following', 
authController.protect, userController.userFollowing)

router.post('/follow', 
authController.protect, userController.follow)

router.post('/unfollow', 
authController.protect, userController.unfollow)
 
router.post('/upload-image', authController.protect,
 formidable({ maxFileSize: '5 * 1024 * 1024'}), uploadImage)

router.patch('/profile-update',
authController.protect, userController.updateProfile)

module.exports = router