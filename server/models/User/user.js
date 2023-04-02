const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: false
    },
    id: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    mobile: {
        type: String
    },
    bloodGroup: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    weight: {
        type: Number,
    },
    age: {
        type: Number,
    },
    question: {
        type: String,
    },
    gender: {
        type: String,
    },
    district: {
        type: String,
    },
    image: {
        type: String
    },
})

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id }, 'REDWINGSUSER', { expiresIn: '7d' })
//     return token
// }

const User = mongoose.model("user", userSchema)

module.exports = { User }