let mongoose = require('mongoose')
let { ObjectId } = mongoose.Schema

let postSchema = new mongoose.Schema({
    content: {
        type: {},
        required: true,
        trim: true
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },
    image: {
        url: String,
        public_id: String
    },
   likes: [
       { type: ObjectId, ref: 'User' }
   ], 
   noOfLikes: {
       type: Number,
       default: 0
   },
   comments: [
        {
           comment: { type: String },
            created: { type: Date, default: Date.now() },
            postedBy: { type: ObjectId, ref: 'User' }
        }
   ]
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)