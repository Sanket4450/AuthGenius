const httpStatus = require('http-status')
const catchAsyncErrors = require('../utils/catchAsyncErrors')
const responseHandler = require('../utils/responsehandler')
const {
    userService
} = require('../services/index.services')

const getUser = catchAsyncErrors(async (req, res) => {
    const user = await userService.getUserProfile(req.user.sub)

    return responseHandler(
        res,
        httpStatus.OK,
        { user }
    )
})

const updateUser = catchAsyncErrors(async (req, res) => {
    const body = req.body
    const user = await userService.updateUserProfile(req.user.sub, body)

    return responseHandler(
        res,
        httpStatus.OK,
        { user },
        'User Updated Successfully'
    )
})

module.exports = {
    getUser,
    updateUser
}