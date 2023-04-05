const { mongoose } = require("mongoose");
const { Requests } = require("../../../models/Admin/requests");
const { User } = require("../../../models/User/user");
const verifyToken = require("../../../Middlewares/auth");
const ObjectId = require('mongoose').Types.ObjectId;

const receiverController = require("express").Router();


receiverController.post('/request', verifyToken, async (req, res) => {
    try {
        const request = new Requests({
            fullName: req.body.fullName,
            gender: req.body.gender,
            age: req.body.age,
            district: req.body.selectedDistrict,
            branch: req.body.selectedBranch,
            bloodGroup: req.body.blood,
            unit: req.body.unit,
            reason: req.body.reason,
            receivedDate: req.body.receivedDate,
            status: req.body.status,
            userId: req.body.userId
        });

        request.save()
        return res.status(201).send('Updated')
    } catch (error) {
        return res.status(500).send("Donation failed: " + error.message)
    }
})

receiverController.get('/transfusion_history', verifyToken, async (req, res) => {
    try {
        const transfusionHistory = await Requests.find({ userId: req.query.id }).exec()
        res.status(201).json(transfusionHistory)
    } catch (error) {
        res.status(500).send("errrr")
    }
})

receiverController.put('/cancel/:id', verifyToken, async (req, res) => {
    try {
        const cancel = await Requests.findByIdAndUpdate(req.params.id, { status: 'Cancelled' }, { new: true })
        res.json(cancel)
    } catch (error) {
        res.status(500).send("errrr")
    }
})


receiverController.get("/totalReceivers", verifyToken, async (req, res) => {
    try {
        const response = await Requests.distinct('userId', { status: "Approved" })
        const details = response.length
        return res.status(200).json(details);
    } catch (error) {
        res.status(500).send("errrr")
    }
})

receiverController.get("/totalRequests", verifyToken, async (req, res) => {
    try {
        const response = await Requests.find()
        const details = response.length
        return res.status(200).json(details);
    } catch (error) {
        res.status(500).send("errrr")
    }
})

receiverController.get("/pendingRequests", verifyToken, async (req, res) => {
    try {
        const response = await Requests.find({status:"Pending"})
        const details = response.length
        return res.status(200).json(details);
    } catch (error) {
        res.status(500).send("errrr")
    }
})

receiverController.get("/approvedRequests", verifyToken, async (req, res) => {
    try {
        const response = await Requests.find({status:"Approved"})
        const details = response.length
        return res.status(200).json(details);
    } catch (error) {
        res.status(500).send("errrr")
    }
})

receiverController.get("/rejectedRequests", verifyToken, async (req, res) => {
    try {
        const response = await Requests.find({status:"Rejected"})
        const details = response.length
        return res.status(200).json(details);
    } catch (error) {
        res.status(500).send("errrr")
    }
})

module.exports = receiverController