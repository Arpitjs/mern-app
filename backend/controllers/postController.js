let Post = require('../models/Post')
let User = require('../models/User')

exports.postByUser = async (req, res, next) => {
    let user = await User.findById(req.user._id)
    let usersFollowing = user.following
    let posts = await Post.find({ postedBy: { $in: [...usersFollowing, req.user._id] } })
        .populate('postedBy', '_id name photo')
        .sort({ createdAt: -1 })
    res.status(200).json({ posts })
}

exports.createPost = async (req, res, next) => {
    if (!req.body.content.length) {
        return next({ msg: 'content is required.' })
    }
    let newPost = await Post.create({
        content: req.body.content,
        postedBy: req.user._id,
        image: {
            url: req.body.image.url,
            public_id: req.body.image.public_id
        }
    })
    res.status(200).json({ msg: 'post created.', newPost })
}

exports.getOnePost = async (req, res, next) => {
    let post = await Post.findById(req.params.id)
    res.status(200).json({ post })
}

exports.canEditDelete = async (req, res, next) => {
    let post = await Post.findById(req.params.id)
    if (post.postedBy.toString() !== req.user._id.toString()) return next({
        msg: 'NOT Authorized', status: 401
    })
    next()
}

exports.editPost = async (req, res, next) => {
    try {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ post })
    } catch (e) {
        next({ msg: e })
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        let post = await Post.findByIdAndDelete(req.params.id)
        if (post.image) {
            await cloudinary
                .uploader.destroy(post.image.public_id)
        }
        res.status(200).json({ ok: true })
    } catch (e) {
        next({ msg: e })
    }
}

exports.like = async (req, res, next) => {
    try {
        let post = await Post.updateOne({ _id: req.body.post._id, likes: { $nin: req.user._id } }, {
            $push: {
                likes: req.user._id
            },
            $inc: { noOfLikes: 1 }
        }, { new: true })

        res.status(200).json({ post, ok: true })
    } catch (e) {
        next({ msg: e })
    }
}

exports.unlike = async (req, res, next) => {
    try {
        let post = await Post.updateOne({ _id: req.body.post._id }, {
            $pull: {
                likes: req.user._id
            },
            $inc: { noOfLikes: -1 }
        }, { new: true })

        res.status(200).json({ post })
    } catch (e) {
        next({ msg: e })
    }
}