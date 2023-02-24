const router = require("express").Router();
const { Admin } = require("../../models/admin");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require('joi-password-complexity')

const validateSignup = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required().label("FullName"),
        email: Joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    })
    return schema.validate(data)
}

router.post("/", async (req, res) => {
    try {
        const { error } = validateSignup(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const admin = await Admin.findOne({ email: req.body.email });
        if (admin)
            return res
                .status(409)
                .send({ message: "Admin with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(10));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new Admin({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "Admin created successfully" });
    } catch (error) {
        console.log(error, 'ffffff');
        res.status(500).send({ message: "Internal Server Errorssss" });
    }
});

module.exports = router;