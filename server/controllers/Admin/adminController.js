const adminController = require("express").Router()
const { Admin } = require("../../models/admin");
const { User } = require("../../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config()
const { validateAdminSignup, validatelogin } = require("../../validation/loginValidation");


adminController.post("/signup", async (req, res) => {
    try {
        const { error } = validateAdminSignup(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const isExisting = await Admin.findOne({ email: req.body.email })
        if (isExisting) {
            return res.status(409).send({ message: "Admin with given email already Exist!" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newAdmin = await Admin.create({ ...req.body, password: hashedPassword })
        const token = jwt.sign({ email: newAdmin.email, id: newAdmin._id, isAdmin: newAdmin.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })
        return res.status(201).json({ newAdmin, token })
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
})



adminController.post("/login", async (req, res) => {
    console.log(req.body, 'fffffff');
    try {
        const { error } = validatelogin(req.body);
        console.log(error, 'ppppppppp');
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const admin = await Admin.findOne({ email: req.body.email })
        if (!admin) {
            return res.status(400).send({ message: "Admin credentials are wrong" })
        }
        const checkPass = await bcrypt.compare(req.body.password, admin.password)
        if (!checkPass) {
            return res.status(400).send({ message: "Admin credentials are wrong" })
        }
        console.log('hdskjaskjbckja');
        const token = jwt.sign({ email: admin.email, id: admin._id, isAdmin: admin.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })
        console.log('dsfsdvdfz vs');
        return res.status(201).json({ admin, token, msg: "Work aayiyii" })

    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});



adminController.get('/users', async (req, res) => {
    try {
        console.log('hbjhbjhbmj');
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})

adminController.get('/users/:id', getUser, (req, res) => {
    console.log('ysssssss');
    res.json(res.user);
});
async function getUser(req, res, next) {
    console.log('------');
    try {
        console.log(req.params.id,'zzzzz');
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = adminController