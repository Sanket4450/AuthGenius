const express = require('express')
const validate = require('../middlewares/validate')
const authValidation = require('../validations/auth.validation')
const authController = require('../controllers/auth.controller')

const router = express.Router()

router.route('/signup').post(validate(authValidation.signup), authController.signup)

router.route('/login').post(validate(authValidation.login), authController.login)

module.exports = router