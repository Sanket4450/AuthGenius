const mongoose = require('mongoose')
const correctFields = require('./plugins/correctFields.plugin')

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
        type: Number
    },
    password: {
        type: String
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
    timestamps: true,
    autoIndex: false
})

// Apply the plugin to your schema
userSchema.plugin(correctFields);

module.exports = mongoose.model('User', userSchema)