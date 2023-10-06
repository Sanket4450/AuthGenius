const Joi = require('joi')

const {
    stringValidation,
    numberValidation,
    integerNumberValidation
} = require('./common')

const updateUser = {
    body: Joi.object().keys({
        fullname: stringValidation.min(4).max(30),
        email: stringValidation.email().lowercase(),
        mobile: numberValidation,
        address: stringValidation,
        city: stringValidation,
        country: stringValidation,
        zipcode: integerNumberValidation
    })
}

module.exports = {
    updateUser
}