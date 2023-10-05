const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    // verified: {
    //     type: Boolean
    // },
    mobile: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    zipcode: {
        type: Number
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)