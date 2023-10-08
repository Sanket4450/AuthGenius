const jwt = require('jsonwebtoken')
const { VARIABLES } = require('../constants')

const generateToken = ({ payload, secret, options }) => jwt.sign(payload, secret, options)

const generateAuthTokens = async (userId, role = 1) => {
    const payload = {
        sub: userId,
        role
    }

    const accessToken = generateToken({
        payload,
        secret: VARIABLES.ACCESS_TOKEN_SECRET,
        options: { expiresIn: VARIABLES.ACCESS_TOKEN_EXPIRY }
    })

    const refreshToken = generateToken({
        payload,
        secret: VARIABLES.REFRESH_TOKEN_SECRET,
        options: { expiresIn: VARIABLES.REFRESH_TOKEN_EXPIRY }
    })

    return {
        accessToken,
        refreshToken
    }
}

module.exports = {
    generateAuthTokens,
    generateToken
}