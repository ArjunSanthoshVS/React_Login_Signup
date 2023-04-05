const { Donations } = require("../../models/Admin/donations");
const { Requests } = require("../../models/Admin/requests");
const bloodController = require("express").Router()


bloodController.get("/getAvailableUnits", async (req, res) => {
    try {
        const response = await Donations.find({ status: "Approved" });
        res.json(response);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

bloodController.get("/getTransfusion", async (req, res) => {
    try {
        const response = await Requests.find();
        res.json(response);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

bloodController.get("/getDonations", async (req, res) => {
    try {
        const response = await Donations.find();
        res.json(response);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

module.exports = bloodController