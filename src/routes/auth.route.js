const express = require('express')
const validate = require('../middlewares/validate')
const authValidation = require('../validations/auth.validation')
const authController = require('../controllers/auth.controller')

const router = express.Router()

router.post('/signup', validate(authValidation.signup), authController.signup)

router.post('/login', validate(authValidation.login), authController.login)

router.post('/token', validate(authValidation.token), authController.generateToken)

router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword)

router.post('/verify-reset-otp', validate(authValidation.verifyResetOtp), authController.verifyResetOtp)

router.put('/reset-password', validate(authValidation.resetPassword), authController.resetPassword)

module.exports = router