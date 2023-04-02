const { Donations } = require("../../models/Admin/donations");
const { Requests } = require("../../models/Admin/requests");
const bloodController = require("express").Router()


bloodController.get("/getAvailableUnits", async (req, res) => {
    const response = await Donations.find({status:"Approved"});
    console.log(response);
    res.json(response);
});

bloodController.get("/getTransfusion", async (req, res) => {
    const response = await Requests.find();
    console.log(response);
    res.json(response);
});

bloodController.get("/getDonations", async (req, res) => {
    const response = await Donations.find();
    console.log(response);
    res.json(response);
});

module.exports = bloodController