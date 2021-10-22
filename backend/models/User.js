let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unqiue: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true,
        lowercase: true
    }, 
    about: {},
    role: {
        type: String,
        enum: ['Subscriber', 'Admin'],
        default: 'Subscriber'
    },
    photo: {
        url: String,
        public_id: String
    },
    following: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true })

let User = mongoose.model('User', userSchema)

module.exports = User