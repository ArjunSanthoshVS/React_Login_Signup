const adminController = require("express").Router()
const { Admin } = require("../../models/Admin/admin");
const { User } = require("../../models/User/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config()
const ObjectId = require('mongoose').Types.ObjectId;
const { validateAdminSignup, validatelogin } = require("../../validation/loginValidation");
const { Donations } = require("../../models/Admin/donations");
const { Requests } = require("../../models/Admin/requests");
const { Branches } = require("../../models/Admin/Branches");


adminController.post("/signup", async (req, res) => {
    try {
        const { error } = validateAdminSignup(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const isExisting = await Admin.findOne({ email: req.body.email })
        if (isExisting) {
            return res.status(409).send({ message: "Admin with given email already Exist!" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newAdmin = await Admin.create({ ...req.body, password: hashedPassword })
        const token = jwt.sign({ email: newAdmin.email, id: newAdmin._id, isAdmin: newAdmin.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })
        return res.status(201).json({ newAdmin, token })
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
})



adminController.post("/login", async (req, res) => {
    console.log(req.body, 'fffffff');
    try {
        const { error } = validatelogin(req.body);
        console.log(error, 'ppppppppp');
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const admin = await Admin.findOne({ email: req.body.email })
        if (!admin) {
            return res.status(400).send({ message: "Admin credentials are wrong" })
        }
        const checkPass = await bcrypt.compare(req.body.password, admin.password)
        if (!checkPass) {
            return res.status(400).send({ message: "Admin credentials are wrong" })
        }
        console.log('hdskjaskjbckja');
        const token = jwt.sign({ email: admin.email, id: admin._id, isAdmin: admin.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })
        console.log('dsfsdvdfz vs');
        return res.status(201).json({ admin, token, msg: "Work aayiyii" })

    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});



adminController.get('/users', async (req, res) => {
    try {
        console.log('hbjhbjhbmj');
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})

adminController.get('/users/:id', getUser, (req, res) => {
    console.log('ysssssss');
    res.json(res.user);
});
async function getUser(req, res, next) {
    console.log('------');
    try {
        console.log(req.params.id, 'zzzzz');
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

adminController.get("/donations", async (req, res) => {
    console.log('78890sd');
    try {
        const donors = await Donations.find({})
        console.log(donors, 'qazcghnk');
        res.json(donors);
    } catch (error) {
        console.log('donors errrorr adichuu ');
    }
})

adminController.get("/userDonations/:id", async (req, res) => {
    console.log('78890sd');
    try {
        const donors = await Donations.find({ userId: req.params.id })
        console.log(donors, 'qazcghnk');
        res.json(donors);
    } catch (error) {
        console.log('donors errrorr adichuu ');
    }
})

adminController.get("/requests", async (req, res) => {
    console.log('fffffffffff');
    try {
        const requestDetails = await Requests.find()
        console.log(requestDetails, 'zzz');
        res.json(requestDetails)
    } catch (error) {
        res.send(500).send("errrrr")
    }
})

adminController.get("/userRequests/:id", async (req, res) => {
    console.log(req.params.id, 'oooo99999');
    try {
        const requests = await Requests.find({ userId: req.params.id })
        console.log(requests, 'qazcghnk');
        res.json(requests);
    } catch (error) {
        console.log('donors errrorr adichuu ');
    }
})

adminController.put("/requests/:id/approve", async (req, res) => {
    console.log(req.params.id, 'fffffffffff');
    const userId = req.params.id;
    try {
        const approve = await Requests.findByIdAndUpdate(userId, { status: 'Approved' }, { new: true });
        res.json(approve);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})

adminController.put("/requests/:id/reject", async (req, res) => {
    console.log(req.params.id, 'fffffffffff');
    const userId = req.params.id;
    try {
        const approve = await Requests.findByIdAndUpdate(userId, { status: 'Rejected' }, { new: true });
        res.json(approve);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})

adminController.put("/donations/:id/approveDonation", async (req, res) => {
    console.log(req.params.id, 'fffffffffff');
    const userId = req.params.id;
    try {
        const approve = await Donations.findByIdAndUpdate(userId, { status: 'Approved' }, { new: true });
        res.json(approve);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})

adminController.post("/newBranch", async (req, res) => {
    console.log(req.body, 'fffffffffff');
    try {
        const existingBranch = await Branches.findOne({ $or: [{ branch: req.body.branch }, { address: req.body.address }] });
        if (existingBranch) {
            return res.status(409).send({ message: "Branch already exists!" });
        } else {
            const branch = new Branches(req.body);
            console.log(branch);
            await branch.save();
            return res.status(201).json(branch);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal server error');
    }
});

adminController.get("/branches", async (req, res) => {
    console.log('branchessss');
    try {
        const branches = await Branches.find()
        res.json(branches)
    } catch (error) {
        console.log(error, 'ccccccccccc');
        res.status(500).json({ error: error.message });
    }
})

adminController.put("/editBranch", async (req, res) => {
    console.log(req.body, 'xddxd');
    const { selectedBranch, district, branch, address, phone } = req.body;
    try {
        const response = await Branches.findByIdAndUpdate({ _id: selectedBranch._id }, { ...selectedBranch, district, branch, address, phone })
        res.json(response)
    } catch (error) {
        console.log(error, 'dfyujhbnk');
        return res.status(409).send({ message: "Branch already Exist!" });
    }
})

adminController.delete("/removeBranch/:id", async (req, res) => {
    console.log(req.params.id, 'xddxd');
    try {
        const response = await Branches.findByIdAndDelete({ _id: req.params.id })
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})

adminController.get("/districtChoose", async (req, res) => {
    console.log(req.body);
    try {
        const response = await Branches.find({ district: req.body })
        console.log(response, 'jhgfdfghjk');
        // res.json(response)
    } catch (error) {
        console.log(error);
    }
})
module.exports = adminController