let express = require('express')
let morgan = require('morgan')
let cors = require('cors')
let mongoose = require('mongoose')
require('dotenv').config({ path: './config.env'})

let authRoutes = require('../backend/routes/authRoutes')
let postRoutes = require('../backend/routes/postRoutes')
let userRoutes = require('../backend/routes/userRoutes')

let app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ limit: '5mb'}))
app.use(express.urlencoded({ extended: true, limit: '200mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

mongoose.connect('mongodb://localhost:27017/mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('db connected!'))
.catch(err => console.log(err))

app.use((err, req, res, next) => {
    console.log('i am error handling middleware.')
    console.log(err)
    statusCode = err.status || 400
    res.status(statusCode).json({ err })
})

let port = process.env.PORT
app.listen(port, () => console.log('server listening at ' + port))