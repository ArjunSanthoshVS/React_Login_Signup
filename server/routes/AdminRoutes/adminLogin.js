const router = require("express").Router();
const { Admin } = require("../../models/admin");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    console.log(schema.validate(data), 'ssssssss');
    return schema.validate(data);
};


router.post("/", async (req, res) => {
    console.log(req.body, 'fffffff');
    try {
        const { error } = validate(req.body);
        console.log(error, 'ppppppppp');
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const admin = await Admin.findOne({ email: req.body.email });
        console.log(admin, 'llllll');
        if (!admin) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            admin.password
        );
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        const token = admin.generateAdminToken();
        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Errorddddd" });
    }
});



module.exports = router;