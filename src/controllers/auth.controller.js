const httpStatus = require('http-status')
const catchAsyncErrors = require('../utils/catchAsyncErrors')
const sendSuccess = require('../utils/responsehandler')
const {
    authService,
    userService,
    tokenService
} = require('../services/index.services')

const signup = catchAsyncErrors(async (req, res) => {
    const body = req.body
    await authService.checkUserWithEmail(body.email)

    // body.verified = false
    const user = await userService.createUser(body)
    // Send verification email to the user
    // check email verification
    // if verified, set user.verified = true

    const tokens = await tokenService.generateAuthTokens(user._id)
    console.log("Token generated successfully")

    console.log("User Signup = " + body.email)

    return sendSuccess(
        res,
        httpStatus.OK,
        { user, tokens },
        'User Signup Successfully'
    )
})

const login = catchAsyncErrors(async (req, res) => {
    const { email, password } = req.body

    const user = await authService.loginUserWithEmailAndPassword(email, password)
    console.log("User found")

    const tokens = await tokenService.generateAuthTokens(user._id)
    console.log("Token generated successfully")

    console.log("User logged-in successfully")

    return sendSuccess(
        res,
        httpStatus.OK,
        { user, tokens },
        'User logged-in successfully'
    )
})

module.exports = {
    signup,
    login
}