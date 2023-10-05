module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    const stack = err.stack

    res.status(statusCode).json({
        success: false,
        message,
        stack
    })
}