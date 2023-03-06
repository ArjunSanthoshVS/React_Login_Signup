// const router = require("express").Router();
// const { User } = require("../../models/user");
// const bcrypt = require("bcrypt");
// const Joi = require("joi");
// const passwordComplexity = require('joi-password-complexity')

// const validateSignup = (data) => {
//     const schema = Joi.object({
//         firstName: Joi.string().required().label("First Name"),
//         lastName: Joi.string().required().label("Last Name"),
//         email: Joi.string().required().label("Email"),
//         password: passwordComplexity().required().label("Password"),
//     })
//     return schema.validate(data)
// }

// router.post("/", async (req, res) => {
//     try {
//         const { error } = validateSignup(req.body);
//         if (error)
//             return res.status(400).send({ message: error.details[0].message });

//         const user = await User.findOne({ email: req.body.email });
//         if (user)
//             return res
//                 .status(409)
//                 .send({ message: "User with given email already Exist!" });

//         const salt = await bcrypt.genSalt(Number(10));
//         const hashPassword = await bcrypt.hash(req.body.password, salt);

//         await new User({ ...req.body, password: hashPassword }).save();
//         res.status(201).send({ message: "User created successfully" });
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });

// module.exports = router;