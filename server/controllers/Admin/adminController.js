const adminController = require("express").Router()
const { Admin } = require("../../models/admin");
const { User } = require("../../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config()
const { validateAdminSignup, validatelogin } = require("../../validation/loginValidation");


adminController.post("/admin_signup", async (req, res) => {
    try {
        console.log(req.body, 'jjjjjjjjj');
        const { error } = validateAdminSignup(req.body);
        console.log('kkkkkkk');
        if (error) {
            console.log(';errrrrrrrrrr');
            return res.status(400).send({ message: error.details[0].message })
        }
        const isExisting = await Admin.findOne({ email: req.body.email })
        console.log('1111111111');
        if (isExisting) {
            console.log('22222222222');
            return res.status(409).send({ message: "Admin with given email already Exist!" });
        }
        console.log('3333333333333333');
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log('44444444');
        const newAdmin = await Admin.create({ ...req.body, password: hashedPassword })
        const { password, ...others } = newAdmin._doc
        const token = jwt.sign({ id: newAdmin._id, isAdmin: newAdmin.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })
        return res.status(201).json({ others, token })
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
})



adminController.post("/admin_login", async (req, res) => {
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

        const { password, ...others } = admin._doc
        console.log('hdskjaskjbckja');
        const token = jwt.sign({ id: admin._id, isAdmin: admin.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })
        console.log('dsfsdvdfz vs');
        return res.status(201).json({ others, token, msg: "Work aayiyii" })

    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});




adminController.get('/activeUsers', async (req, res) => {
    try {
        User.find().then((data) => {
            res.json(data)
        })
    } catch (error) {
        return res.status(500).send({ message: "Catch block work ayi" });
    }
})

module.exports=adminController