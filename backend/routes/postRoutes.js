let express = require('express')
let router = new express.Router()
let formidable = require('express-formidable')
let authController = require('../controllers/authController')
let postController = require('../controllers/postController')
let { uploadImage } = require('../utils/Image')

router.get('/user-posts', authController.protect, postController.postByUser)

router.get('/user-post/:id', authController.protect, postController.getOnePost)

router.get('/total-posts', postController.totalPosts)

router.get('/posts', postController.posts)

router.get('/post/:id', postController.getOnePost)

router.post('/create-post', authController.protect, postController.createPost)

router.post('/upload-image', authController.protect,
 formidable({ maxFileSize: '5 * 1024 * 1024'}), uploadImage)

 router.post('/like', 
 authController.protect, postController.like)
 
 router.post('/unlike', 
 authController.protect, postController.unlike)

 router.post('/add-comment', 
 authController.protect, postController.addComment)

 router.patch('/edit-post/:id', authController.protect,
 postController.canEditDelete, postController.editPost)

 router.delete('/delete-post/:id', authController.protect,
 postController.canEditDelete, postController.deletePost)

 router.delete('/remove-comment/:postId/:id', 
 authController.protect, postController.removeComment)

module.exports = router