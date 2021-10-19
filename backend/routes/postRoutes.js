let express = require('express')
let router = new express.Router()
let formidable = require('express-formidable')
let authController = require('../controllers/authController')
let postController = require('../controllers/postController')
let {uploadImage} = require('../utils/uploadImage')

router.post('/create-post', authController.protect, postController.createPost)
router.get('/user-posts', authController.protect, postController.postByUser)
router.get('/user-post/:id', authController.protect, postController.getOnePost)

router.post('/upload-image', authController.protect,
 formidable({ maxFileSize: '5 * 1024 * 1024'}), uploadImage)

router.patch('/edit-post/:id', authController.protect,
 postController.canEditDelete, postController.editPost)

 router.delete('/delete-post/:id', authController.protect,
 postController.canEditDelete, postController.deletePost)

 router.post('/like', 
 authController.protect, postController.like)
 
 router.post('/unlike', 
 authController.protect, postController.unlike)

module.exports = router