const httpStatus = require('http-status')
const MESSAGES = require('../constants').MESSAGES
const ErrorHandler = require('../utils/errorhandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'
    console.log(err.stack)

    if (err.name === 'JsonWebTokenError') {
        err = new ErrorHandler(MESSAGES.AUTHENTICATION_FAILED, httpStatus.UNAUTHORIZED)
    }

    if (err.name === 'TokenExpiredError') {
        err = new ErrorHandler(MESSAGES.TOKEN_EXPIRED, httpStatus.UNAUTHORIZED)
    }

    if (err.name === 'MongoServerError') {
        err = new ErrorHandler(MESSAGES.DUPLICATE_VALUE, httpStatus.CONFLICT);
    }

    res.status(err.statusCode).json({
        type: "error",
        message: err.message
    })
}