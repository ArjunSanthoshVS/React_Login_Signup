// const router = require("express").Router();
// const { User } = require("../../models/user");
// const bcrypt = require("bcrypt");
// const Joi = require("joi");



// const validatelogin = (data) => {
//     const schema = Joi.object({
//         email: Joi.string().email().required().label("Email"),
//         password: Joi.string().required().label("Password"),
//     });
//     console.log(schema.validate(data), 'ssssssss'); 
//     return schema.validate(data);
// };


// router.post("/", async (req, res) => {
//     console.log(req.body, 'fffffff');
//     try {
//         const { error } = validatelogin(req.body);
//         console.log(error, 'ppppppppp');
//         if (error) {
//             return res.status(400).send({ message: error.details[0].message });
//         }
//         const user = await User.findOne({ email: req.body.email });
//         console.log(user, 'llllll');
//         if (!user) {
//             return res.status(401).send({ message: "Invalid Email or Password" });
//         }
//         const validPassword = await bcrypt.compare(
//             req.body.password,
//             user.password
//         );
//         if (!validPassword) {
//             return res.status(401).send({ message: "Invalid Email or Password" });
//         }
//         const token = user.generateAuthToken();
//         res.status(200).send({ data: token, message: "logged in successfully" });
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });



// module.exports = router;