const { mongoose } = require("mongoose");
const { Requests } = require("../../../models/Admin/requests");
const { User } = require("../../../models/User/user");
const ObjectId = require('mongoose').Types.ObjectId;

const receiverController = require("express").Router();


receiverController.post('/request', async (req, res) => {
    // const transfusionDetails = {
    //     selectedDistrict: req.body.selectedDistrict,
    //     selectedBranch: req.body.selectedBranch,
    //     blood: req.body.blood,
    //     unit: req.body.unit,
    //     reason: req.body.reason,
    //     age: req.body.age,
    //     receivedDate: req.body.receivedDate,
    //     fullName: req.body.fullName,
    //     gender: req.body.gender,
    //     status: req.body.status,
    // }
    let transfusionRequest = {
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
        userId:req.body.userId
    }
    console.log(transfusionRequest, 'bodyyyyy');
    try {
        console.log(req.body.id);
        // await User.updateOne({ _id: req.body.id }, { $push: { Transfusion: transfusionDetails } })
        // await Requests.updateMany({ $push: { requests: transfusionRequest } });
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
        console.log(request, 'nbvmn');

        return res.status(201).send('Updated')
    } catch (error) {
        return res.status(500).send("Donation failed: " + error.message)
    }
})

receiverController.get('/transfusion_history', async (req, res) => {
    try {
        console.log(req.query.id, '78542');
        const transfusionHistory = await Requests.find({ userId: req.query.id }).exec()
        console.log(transfusionHistory, '777888');
        res.status(201).json(transfusionHistory)
    } catch (error) {
        res.status(500).send("errrr")
    }
})

receiverController.put('/cancel/:id', async (req, res) => {
    try {
        const cancel = await Requests.findByIdAndUpdate(req.params.id, { status: 'Cancelled' }, { new: true })
        res.json(cancel)
    } catch (error) {
        console.log(error);
    }
})
module.exports = receiverController