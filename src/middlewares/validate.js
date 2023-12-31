const Joi = require('joi')
const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ErrorHandler = require('../utils/errorhandler')

const schemaOptions = {
    errors: {
        wrap: {
            label: '',
        },
    },
}

const validate = schema => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body'])
    const object = pick(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object, schemaOptions)

    if (error) {
        const errorMessage = error.details[0].message
        return next(new ErrorHandler(errorMessage, httpStatus.BAD_REQUEST))
    }
    Object.assign(req, value)
    return next()
}

module.exports = validate