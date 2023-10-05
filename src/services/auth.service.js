const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const ErrorHandler = require("../utils/errorhandler")
const MESSAGES = require('../constants').MESSAGES
const userService = require('./user.service')

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

module.exports = {
    checkUserWithEmail,
    loginUserWithEmailAndPassword
}