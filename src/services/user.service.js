const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const resourceRepo = require('../dataRepositories/resourceRepo')
const ErrorHandler = require('../utils/errorhandler')
const COLLECTIONS = require('../constants').COLLECTIONS

const getUserByEmail = (email) => {
    const query = {
        email
    }
    return resourceRepo.findOne(COLLECTIONS.USER, { query })
}

const createUser = async (userBody) => {
    try {
        userBody.password = await bcrypt.hash(userBody.password, 10)
        return resourceRepo.create(COLLECTIONS.USER, {
            data: userBody
        })
    } catch (error) {
        console.log("Create User Error = " + error)
        throw new ErrorHandler('Something went wrong, Please try again', httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    getUserByEmail,
    createUser
}