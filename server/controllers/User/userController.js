const userController = require("express").Router();
const { User } = require("../../models/User/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config()
const { validateSignup, validatelogin } = require("../../validation/loginValidation");
const { default: userAuth } = require("../../Middlewares/auth");
const multer = require('multer')
const profileImage = require('../../models/User/profileImg')
const fs = require('fs');
const { Branches } = require("../../models/Admin/Branches");
const verifyToken = require("../../Middlewares/auth");
const { Donations } = require("../../models/Admin/donations");

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
    try {
        const { error } = validatelogin(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send({ message: "User credentials are wrong" })
        }
        const checkPass = await bcrypt.compare(req.body.password, user.password)
        if (!checkPass) {
            return res.status(400).send({ message: "User credentials are wrong" })
        }
        const token = jwt.sign({ email: user.email, id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })

        return res.status(201).json({ user, token, msg: "Work aayiyii" })

    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});


userController.put("/profile",verifyToken, async (req, res) => {
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
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.body._id }, updatedFields, { new: true });
        return res.status(201).json({ updatedUser, message: "updated" })
    } catch (error) {
        console.error(error);
        throw new Error('Error updating user profile');
    }
})

userController.post("/profilePicture", verifyToken, async (req, res) => {
    try {
        const updatedImage = await User.findOneAndUpdate({ _id: req.body.userId }, { image: req.body.url }, { new: true })
        return res.status(201).json({ updatedImage })
    } catch (error) {
        console.log(error, '[[[[[ifffff');
    }
})

userController.get("/allDistricts", verifyToken, async (req, res) => {
    try {
        const districts = await Branches.distinct('district');
        return res.status(201).json({ districts })
    } catch (error) {
        return res.status(500).send({ message: "Not getting all districts" })
    }
})

userController.get("/districtChoose", verifyToken, async (req, res) => {
    try {
        const branches = await Branches.find({ district: req.query.district }, { branch: 1, address: 1 });
        return res.status(200).json({ branches });
    } catch (error) {
        return res.status(500).send({ message: "Error getting branches" });
    }
})

userController.get("/totalUnits", verifyToken, async (req, res) => {
    try {
        console.log('kjhgfdfghjkl');
        const response = await Donations.find()
        console.log(response,'jhghj');
        const details = response.length
        return res.status(200).json(details);
    } catch (error) {
        return res.status(500).send({ message: "Error getting branches" });
    }
})


module.exports = userController
