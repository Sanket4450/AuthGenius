const Joi = require('joi')

const {
    stringValidation,
    stringReqValidation,
    emailValidation,
    numberReqValidation,
    passwordValidation,
    integerNumberReqValidation
} = require('./common')

const signup = {
    body: Joi.object().keys({
        fullname: stringReqValidation.min(4).max(30),
        email: emailValidation,
        mobile: numberReqValidation,
        password: passwordValidation,
        address: stringValidation.max(100),
        city: stringValidation,
        country: stringValidation,
        zipcode: integerNumberReqValidation
    })
}

const login = {
    body: Joi.object().keys({
        email: emailValidation,
        password: passwordValidation
    })
}

const token = {
    body: Joi.object().keys({
        token: stringReqValidation
    })
}

const forgotPassword = {
    body: Joi.object().keys({
        email: emailValidation
    })
}

const verifyResetOtp = {
    body: Joi.object().keys({
        token: stringReqValidation,
        otp: integerNumberReqValidation
    })
}

const resetPassword = {
    body: Joi.object().keys({
        token: stringReqValidation,
        password: passwordValidation
    })
}

module.exports = {
    signup,
    login,
    token,
    forgotPassword,
    verifyResetOtp,
    resetPassword
}