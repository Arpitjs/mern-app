let mapUsers = require('../utils/mapUser')
let User = require('../models/User')
let bcrypt = require('../utils/bcrypt')
let { validateRegister } = require('../utils/validateUser')
let jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
    try {
        let toCreate = {}
    mapUsers(toCreate, req.body, true)
    let hasError = validateRegister(toCreate)
    if (hasError) return next({ msg: hasError, status: 400 })
    toCreate.password = await bcrypt.hashPassword(toCreate.password)
    await User.create({ ...toCreate })
    res.status(200).json({
        msg: 'user created', ok: true
    })  
    } catch (e) {
        next({msg: e})
    }
}

exports.login = async (req, res, next) => {
    let { name, password } = req.body
    let user = await User.findOne({ name })
    if (!user) return next({ msg: 'invalid username or password.', status: 404 })
    let isValidUser = await bcrypt.comparePassword(password, user.password)
    if (!isValidUser) return next({ msg: 'invalid username or password.', status: 400 })
    jwt.sign({ _id: user._id }, process.env.JWT, { expiresIn: "7d" }, (err, token) => {
        if (err) return next({ msg: err })
        user.password = undefined
        user.secret = undefined
        res.status(200).json({
            msg: 'logged in.', ok: true, token, user
        })
    })
}

exports.protect = async (req, res, next) => {
    if (!req.headers.authorization) return next({ msg: 'token not provided', status: 401 })
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT, async (err, data) => {
        if (err) return next({ msg: err, status: 401 })
        let loggedInUser = await User.findById(data._id)
        req.user = loggedInUser
        next()
    })
}

exports.currentUser = async(req, res, next) => {
    res.status(200).json({ ok: true })
}

exports.forgotPassword = async(req, res, next) => {
    let { email, secret } = req.body
    let user = await User.findOne({ email })
    if(!user) return next({ msg: 'no user found with that email.', status: 404 })
    if(secret !== user.secret) return next({ msg: 'invalid secret'})
    res.status(200).json({ data: user._id })

}

exports.resetPassword = async(req, res, next) => {
    if(req.body.newPassword !== req.body.confirmNewPassword) return next({ msg: 'the passwords do not match'})
    let user = await User.findById(req.body.id)
    user.password = await bcrypt.hashPassword(req.body.newPassword)
    await user.save()
    res.status(200).json({msg: 'reset done!'})
}