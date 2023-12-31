const environment = process.env.NODE_ENV || 'development'
const envFilePath = environment === 'production' ? '.env.production' : '.env.local'

require('dotenv').config({ path: envFilePath })
const express = require('express')
const app = express()

const httpStatus = require('http-status')
const uuid = require('uuid').v4
const cors = require('cors')

const domain = require('./src/models/index.model')
const errorhandler = require('./src/middlewares/error')
const connectDatabase = require('./src/config/db')
const ErrorHandler = require('./src/utils/errorhandler')

connectDatabase()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    )
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'Content-Type')
    next()
})

global.domain = domain

app.use(cors({
    allowedHeaders: ['Origin', 'Authorization', 'Content-Type', 'Accept']
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
    req.identifier = uuid()
    const logString = `A request has been made with the following uuid [${req.identifier}] ${req.url} ${JSON.stringify(req.body)}`
    console.log(logString)
    next()
})

app.use('/api/v1', require('./src/routes/index.route'))

app.use((req, res, next) => {
    next(new ErrorHandler('Route not Found', httpStatus.NOT_FOUND))
})

app.use(errorhandler)

module.exports = app