const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const ErrorHandler = require('../utils/errorhandler')
const MESSAGES = require('../constants').MESSAGES
const VARIABLES = require('../constants').VARIABLES

module.exports = function checkAuth (req, res, next) {
    try {
        const token =
            req.headers && req.headers.authorization
            ? req.headers.authorization.split(' ')[1]
            : ''
        
        const decodedData = jwt.verify(token, VARIABLES.ACCESS_TOKEN_SECRET)

        req.user = decodedData
        next()
    } catch (error) {
        console.log(error)

        if (error.name === 'JsonWebTokenError') {
            return next(new ErrorHandler(MESSAGES.AUTHENTICATION_FAILED, httpStatus.UNAUTHORIZED))
        }
        return next(new ErrorHandler(error.message, httpStatus.UNAUTHORIZED))
    }
}