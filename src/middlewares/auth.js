const jwt = require('jsonwebtoken')
const catchAsyncErrors = require('../utils/catchAsyncErrors')
const {VARIABLES} = require('../constants')

module.exports = catchAsyncErrors(checkAuth = (req, res, next) => {
    const token =
        req.headers && req.headers.authorization
        ? req.headers.authorization.split(' ')[1]
        : ''
    
    const decodedData = jwt.verify(token, VARIABLES.ACCESS_TOKEN_SECRET)

    req.user = decodedData
    next()
})