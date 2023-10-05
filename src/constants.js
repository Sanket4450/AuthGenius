require('dotenv').config()

const VARIABLES = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY
}

const MESSAGES = {
    USER_ALREADY_EXISTS: "User already exists with this email or mobile",
    INCORRECT_EMAIL: "Incorrect Email",
    INCORRECT_PASSWORD: "Incorrect Password"
}

const COLLECTIONS = {
    USER: 'User'
}

module.exports = {
    VARIABLES,
    MESSAGES,
    COLLECTIONS
}