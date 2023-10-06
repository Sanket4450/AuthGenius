const express = require('express')
const validate = require('../middlewares/validate')
const userValidation = require('../validations/user.validation')
const userController = require('../controllers/user.controller')
const authChecker = require('../middlewares/auth')

const router = express.Router()

router.route('/profile').get(authChecker, userController.getUser)

router.route('/profile').put(authChecker, validate(userValidation.updateUser), userController.updateUser)

module.exports = router