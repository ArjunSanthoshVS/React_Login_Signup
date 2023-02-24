const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

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
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'REDWINGSUSER', { expiresIn: '7d' })
    return token
}

const User = mongoose.model("user", userSchema)

module.exports = { User }

User.find((err, users) => {
    if (err) {
        console.log('Error retrieving products from database', err);
        return;
    }

    console.log('Users:', users);
});