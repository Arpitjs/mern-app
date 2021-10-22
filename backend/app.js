let express = require('express')
let morgan = require('morgan')
let cors = require('cors')
let mongoose = require('mongoose')
require('dotenv').config({ path: './config.env'})

let authRoutes = require('../backend/routes/authRoutes')
let postRoutes = require('../backend/routes/postRoutes')
let userRoutes = require('../backend/routes/userRoutes')

let app = express()
let http = require('http').createServer(app)
let io = require('socket.io')(http, {
  path: '/socket.io',
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-type"]
    }
  })

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

io.on('connect', socket => {
  socket.on('from dashboard', () => socket.broadcast.emit('returned'))
  socket.on('new post', newPost => socket.broadcast.emit('send post', newPost))
  socket.on('delete post', () => socket.broadcast.emit('deleted'))
})

let port = process.env.PORT
http.listen(port, () => console.log('server listening at ' + port))