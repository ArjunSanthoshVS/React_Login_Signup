const { User } = require("../../../models/User/user");
const { Donations } = require("../../../models/Admin/donations");
const { Requests } = require("../../../models/Admin/requests");
const { Branches } = require("../../../models/Admin/Branches");
const verifyToken = require("../../../Middlewares/auth");
const donorController = require("express").Router();

donorController.post('/donate', verifyToken, async (req, res) => {
    try {
        const donation = new Donations({
            fullName: req.body.fullName,
            gender: req.body.gender,
            age: req.body.age,
            district: req.body.selectedDistrict,
            branch: req.body.selectedBranch,
            bloodGroup: req.body.blood,
            unit: req.body.unit,
            disease: req.body.disease,
            donatedDate: req.body.donatedDate,
            status: req.body.status,
            userId: req.body.userId
        });
        donation.save()
        return res.status(201).send('Updated')
    } catch (error) {
        return res.status(500).send("Donation failed: " + error.message)
    }
})

donorController.get('/donation_history', verifyToken, async (req, res) => {
    try {
        const donationHistory = await Donations.find({ userId: req.query.id }).exec()
        res.status(201).json(donationHistory)
    } catch (error) {
        res.status(500).send("errrr")
    }
})

donorController.get('/pateintDetails', verifyToken, async (req, res) => {
    try {
        const response = await Requests.find({ status: "Pending" })
        res.status(201).json(response)
    } catch (error) {
        res.status(500).send("errrr")
    }
})

donorController.get('/transfusionDistricts', verifyToken, async (req, res) => {
    try {
        const response = await Requests.distinct('district')
        res.status(201).json(response)
    } catch (error) {
        res.status(500).send("errrr")
    }
})

donorController.get("/getBranches", verifyToken, async (req, res) => {
    try {
        const branches = await Branches.find({ district: req.query.district }, { branch: 1, _id: 0 });
        const branchNames = branches.map(branchObj => branchObj.branch);
        return res.status(200).json({ branchNames });
    } catch (error) {
        return res.status(500).send({ message: "Error getting branches" });
    }
})

donorController.get("/totalDonors", verifyToken, async (req, res) => {
    try {
        const response = await Donations.distinct('userId')
        const details=response.length
        return res.status(200).json(details);
    } catch (error) {
        return res.status(500).send({ message: "Error getting branches" });
    }
})


module.exports = donorController