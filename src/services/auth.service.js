const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const ErrorHandler = require("../utils/errorhandler")
const { MESSAGES } = require('../constants')
const { VARIABLES } = require('../constants')
const userService = require('./user.service')
const tokenService = require('./token.service')

const checkUserWithEmail = async (email) => {
    console.log('Inside CheckuserWithEmail = ' + email)

    const user = await userService.getUserByEmail(email)

    if (user) {
        throw new ErrorHandler(MESSAGES.USER_ALREADY_EXISTS, httpStatus.CONFLICT)
    }

    console.log("User not found inside checkUserwithEmail")
    return true
}

const loginUserWithEmailAndPassword = async (email, password) => {
    console.log('Inside loginUserWithEmailAndPassword')

    const user = await userService.getUserByEmail(email)

    if (!user) {
        console.log('Email not found')
        throw new ErrorHandler(MESSAGES.INCORRECT_EMAIL, httpStatus.UNAUTHORIZED)
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new ErrorHandler(MESSAGES.INCORRECT_PASSWORD, httpStatus.UNAUTHORIZED)
    }

    return user
}

const forgotPassword = async (email) => {
    console.log('Inside forgotPassword')

    const user = await userService.getUserByEmail(email)

    if (!user) {
        throw new ErrorHandler(MESSAGES.USER_NOT_FOUND, httpStatus.NOT_FOUND)
    }

    const resetToken = tokenService.generateToken({
        payload: { sub: user._id },
        secret: VARIABLES.RESET_TOKEN_SECRET,
        options: { expiresIn: VARIABLES.RESET_TOKEN_EXPIRY }
    })

    return {
        resetToken
    }
}

module.exports = {
    checkUserWithEmail,
    loginUserWithEmailAndPassword,
    forgotPassword
}