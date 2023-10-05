const Joi = require('joi')

const stringValidation = Joi.string().trim()
const stringReqValidation = stringValidation.required()
const emailValidation = stringReqValidation.email().lowercase()
const passwordValidation = stringReqValidation.min(8)
const numberValidation = Joi.number()
const numberReqValidation = numberValidation.required()
const integerNumberValidation = numberValidation.integer()
const integerNumberReqValidation = integerNumberValidation.required()
const booleanValidation = Joi.boolean().strict(true)
const dateValidation = Joi.date()
const arrayValidation = Joi.array()

const pageAndLimit = {
    page: integerNumberReqValidation.min(1).label('Page'),
    limit: integerNumberReqValidation.min(1).label('Limit')
}

const validatePageAndLimit = {
    query: Joi.object().keys({
        ...pageAndLimit
    }),
    search: stringValidation
}

module.exports = {
    stringValidation,
    stringReqValidation,
    emailValidation,
    passwordValidation,
    numberValidation,
    numberReqValidation,
    integerNumberValidation,
    integerNumberReqValidation,
    booleanValidation,
    dateValidation,
    arrayValidation,
    pageAndLimit,
    validatePageAndLimit
}