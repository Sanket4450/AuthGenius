const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const resourceRepo = require('../dataRepositories/resourceRepo')
const ErrorHandler = require('../utils/errorhandler')
const { COLLECTIONS } = require('../constants')
const { MESSAGES } = require('../constants')
const User = require('../models/user.model')

const getUserById = async (id) => {
    return User.findById(id)
}

const getUserByEmail = (email) => {
    const query = {
        email
    }
    return resourceRepo.findOne(COLLECTIONS.USER, { query })
}

const updateUserById = async (userId, updateBody) => {
    const query = {
        _id: userId
    }
    const data = {
        $set: updateBody
    }

    return resourceRepo.updateOne(COLLECTIONS.USER, { query, data })
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

const getUserProfile = async (userId) => {
    const user = await getUserById(userId)

    if (!user) {
        throw new ErrorHandler(MESSAGES.USER_NOT_FOUND, httpStatus.NOT_FOUND)
    }

    return user
}

const updateUserProfile = async (userId, userBody) => {
    console.log("Inside updateUserProfile = " + userId, userBody)

    if (userBody.email) {
        const user = await getUserById(userId)

        const emailTaken = await User.findOne({
            $and: [{ email: userBody.email }, { email: { $ne: user.email } }]
        })

        if (emailTaken) {
            throw new ErrorHandler(MESSAGES.EMAIL_ALREADY_TAKEN, httpStatus.CONFLICT)
        }

        // do verification on email & verify
    }
    if (userBody.mobile) {
        // do verification on mobile & verify
    }

    await updateUserById(userId, userBody)

    return getUserById(userId)
}

module.exports = {
    getUserById,
    getUserByEmail,
    updateUserById,
    createUser,
    getUserProfile,
    updateUserProfile
}