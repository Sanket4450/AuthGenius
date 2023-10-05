class ErrorHandler extends Error {
    constructor(message, statusCode, stack = '') {
        super(message)
        this.statusCode = statusCode
        stack ? this.stack = stack : Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler