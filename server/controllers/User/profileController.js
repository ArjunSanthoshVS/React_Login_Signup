const profileController = require("express").Router()
const { User } = require("../../models/user");

profileController.get("/donor", async (req, res) => {
    try {
        console.log(req.query, 'tryil keri');

        User.findOne({ _id: req.query.id }).then((data) => {
            res.json(data)
            console.log(data, 'DATAAAATTT');
        })
    } catch (error) {
        return res.status(500).send({ message: "Catch block work ayi" });
    }
})

profileController.post("/donor", async (req, res) => {
    try {
        console.log(req.body, 'bodyyyyyy');
        const updated = await User.updateMany({ _id: req.params.id },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                bloodGroup: req.body.bloodGroup,
                birthDate: req.body.birthDate,
                weight: req.body.weight,
                age: req.body.age,
                question: req.body.question,
                gender: req.body.gender,
                locality: req.body.locality
            }, { upsert: true }
        )
        return res.status(201).json(updated)
    } catch (error) {
        console.log('Wrk aaayillaaa');
    }
})


module.exports = profileController