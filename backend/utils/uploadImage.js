let cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

exports.uploadImage = async (req, res, next) => {
    // console.log('req files', req.files)
    try {
        cloudinary.uploader.upload(req.files.image.path)
            .then(result => {
                res.status(200)
                    .json({ url: result.secure_url, public_id: result.public_id })
            })
    } catch (e) {
        next({ msg: e })
    }
}