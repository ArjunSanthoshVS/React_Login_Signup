const userController = require("express").Router();
const { User } = require("../../models/User/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config()
const { validateSignup, validatelogin } = require("../../validation/loginValidation");
const { default: auth } = require("../../Middlewares/auth");
const multer = require('multer')
const profileImage = require('../../models/User/profileImg')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

userController.post("/signup", async (req, res) => {
    try {
        const { error } = validateSignup(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const isExisting = await User.findOne({ email: req.body.email })
        if (isExisting) {
            return res.status(409).send({ message: "User with given email already Exist!" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({ ...req.body, password: hashedPassword })
        const token = jwt.sign({ email: newUser.email, id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })
        return res.status(201).json({ newUser, token })
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
})



userController.post("/login", async (req, res) => {
    console.log(req.body);
    try {
        const { error } = validatelogin(req.body);
        console.log('111111');
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        console.log('111111');
        const user = await User.findOne({ email: req.body.email })
        console.log('111111');
        if (!user) {
            return res.status(400).send({ message: "User credentials are wrong" })
        }
        const checkPass = await bcrypt.compare(req.body.password, user.password)
        console.log('111111');
        if (!checkPass) {
            return res.status(400).send({ message: "User credentials are wrong" })
        }
        const token = jwt.sign({ email: user.email, id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })

        console.log('111111');
        return res.status(201).json({ user, token, msg: "Work aayiyii" })

    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});


userController.put("/profile", async (req, res) => {
    const updatedFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        bloodGroup: req.body.bloodGroup,
        birthDate: req.body.birthDate,
        weight: req.body.weight,
        age: req.body.age,
        gender: req.body.gender,
        district: req.body.district,
    }
    console.log(updatedFields, 'aaaaa');
    console.log(req.body._id);
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.body._id }, updatedFields, { new: true });
        console.log('updateddddd');
        return res.status(201).json({ updatedUser, message: "updated" })
    } catch (error) {
        console.error(error);
        throw new Error('Error updating user profile');
    }
})

userController.post("/profilePicture", async (req, res) => {
    try {
        console.log(req.body,'jnkjfvjn');
        const updatedImage = await User.findOneAndUpdate({ _id: req.body.userId }, { image: req.body.url }, { new: true })
        console.log('updatediaagee');
        return res.status(201).json({updatedImage})
    } catch (error) {
        console.log(error, '[[[[[ifffff');
    }
})

module.exports = userController
