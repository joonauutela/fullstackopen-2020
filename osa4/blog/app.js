const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

logger.info('Connecting to mongodb')

const mongoUrl = config.MONGODB_URI


mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {
        logger.info('Connected to mongodb')
    })
    .catch(error => {
        logger.error('Error connecting to mongodb', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)


app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app