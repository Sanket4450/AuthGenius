const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const catchAsyncErrors = require('../utils/catchAsyncErrors')
const sendSuccess = require('../utils/responsehandler')
const { VARIABLES } = require('../constants')
const { MESSAGES } = require('../constants')
const ErrorHandler = require('../utils/errorhandler')
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
        httpStatus.CREATED,
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

const generateToken = catchAsyncErrors(async (req, res) => {
    const { token } = req.body

    const { sub, role } = jwt.verify(token, VARIABLES.REFRESH_TOKEN_SECRET)

    const { accessToken, refreshToken } = await tokenService.generateAuthTokens(sub, role)

    return sendSuccess(
        res,
        httpStatus.OK,
        { accessToken, refreshToken },
        'Tokens generated successfully'
    )
})

const forgotPassword = catchAsyncErrors(async (req, res) => {
    const { email } = req.body

    const { resetToken } = await authService.forgotPassword(email)

    // send verification code on email (ex. 1234)

    return sendSuccess(
        res,
        httpStatus.OK,
        { resetToken },
        'Reset-Token generated successfully'
    )
})

const verifyResetOtp = catchAsyncErrors(async (req, res) => {
    const { token, otp } = req.body

    jwt.verify(token, VARIABLES.RESET_TOKEN_SECRET)

    const verifyOtp = (otp === 1234) // here, ex. 1234

    if (!verifyOtp) {
        throw new ErrorHandler(MESSAGES.INCORRECT_OTP, httpStatus.FORBIDDEN)
    }

    return sendSuccess(
        res,
        httpStatus.OK,
    )
})

const resetPassword = catchAsyncErrors(async (req, res) => {
    const { token, password } = req.body

    const { sub } = jwt.verify(token, VARIABLES.RESET_TOKEN_SECRET)

    const hashedPassword = await bcrypt.hash(password, 10)

    userService.updateUserById(sub, { password: hashedPassword })

    return sendSuccess(
        res,
        httpStatus.CREATED,
        [],
        'Password updated successfully'
    )
})

module.exports = {
    signup,
    login,
    generateToken,
    forgotPassword,
    verifyResetOtp,
    resetPassword
}