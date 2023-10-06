require('dotenv').config()

const VARIABLES = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY
}

const MESSAGES = {
    USER_ALREADY_EXISTS: "User already exists with this Email",
    INCORRECT_EMAIL: "Incorrect Email",
    INCORRECT_PASSWORD: "Incorrect Password",
    AUTHENTICATION_FAILED: "Authentication failed",
    USER_NOT_FOUND: "User not found",
    EMAIL_ALREADY_TAKEN: "Email already taken",
    TOKEN_EXPIRED: 'Token expired',
    DUPLICATE_VALUE: 'Duplicate value entered'
}

const COLLECTIONS = {
    USER: 'User'
}

module.exports = {
    VARIABLES,
    MESSAGES,
    COLLECTIONS
}