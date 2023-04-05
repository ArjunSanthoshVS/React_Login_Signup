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
const verifyToken = require("../../Middlewares/auth");


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
    try {
        const { error } = validatelogin(req.body);
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
        const token = jwt.sign({ email: admin.email, id: admin._id, isAdmin: admin.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })
        return res.status(201).json({ admin, token, msg: "Work aayiyii" })

    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});



adminController.get('/users',verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

adminController.get('/users/:id', getUser, (req, res) => {
    res.json(res.user);
});
async function getUser(req, res, next) {
    try {
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
    try {
        const donors = await Donations.find({})
        res.json(donors);
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

adminController.get("/userDonations/:id", async (req, res) => {
    try {
        const donors = await Donations.find({ userId: req.params.id })
        res.json(donors);
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

adminController.get("/requests", async (req, res) => {
    try {
        const requestDetails = await Requests.find()
        res.json(requestDetails)
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

adminController.get("/userRequests/:id", async (req, res) => {
    try {
        const requests = await Requests.find({ userId: req.params.id })
        res.json(requests);
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

adminController.put("/requests/:id/approve", async (req, res) => {
    const userId = req.params.id;
    try {
        const approve = await Requests.findByIdAndUpdate(userId, { status: 'Approved' }, { new: true });
        res.json(approve);
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

adminController.put("/requests/:id/reject", async (req, res) => {
    const userId = req.params.id;
    try {
        const approve = await Requests.findByIdAndUpdate(userId, { status: 'Rejected' }, { new: true });
        res.json(approve);
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

adminController.put("/donations/:id/approveDonation", async (req, res) => {
    const userId = req.params.id;
    try {
        const approve = await Donations.findByIdAndUpdate(userId, { status: 'Approved' }, { new: true });
        res.json(approve);
    } catch (err) {
        res.status(500).send('Server Error');
    }
})
 
adminController.put("/donations/:id/rejectDonation", async (req, res) => {
    const userId = req.params.id;
    try {
        const reject = await Donations.findByIdAndUpdate(userId, { status: 'Rejected' }, { new: true });
        res.json(reject);
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

adminController.post("/newBranch", async (req, res) => {
    try {
        const existingBranch = await Branches.findOne({ $or: [{ branch: req.body.branch }, { address: req.body.address }] });
        if (existingBranch) {
            return res.status(409).send({ message: "Branch already exists!" });
        } else {
            const branch = new Branches(req.body);
            await branch.save();
            return res.status(201).json(branch);
        }
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});

adminController.get("/branches", async (req, res) => {
    try {
        const branches = await Branches.find()
        res.json(branches)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

adminController.put("/editBranch", async (req, res) => {
    const { selectedBranch, district, branch, address, phone } = req.body;
    try {
        const response = await Branches.findByIdAndUpdate({ _id: selectedBranch._id }, { ...selectedBranch, district, branch, address, phone })
        res.json(response)
    } catch (error) {
        return res.status(409).send({ message: "Branch already Exist!" });
    }
})

adminController.delete("/removeBranch/:id", async (req, res) => {
    try {
        const response = await Branches.findByIdAndDelete({ _id: req.params.id })
        res.json(response)
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

adminController.get("/districtChoose", async (req, res) => {
    try {
        const response = await Branches.find({ district: req.body })
        res.json(response)
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

adminController.get("/units", async (req, res) => {
    try {
        const response = await Donations.find({status:"Approved"}, { bloodGroup: 1, _id: 0 })
        const counts = response.reduce((acc, { bloodGroup }) => {
            acc[bloodGroup] = (acc[bloodGroup] || 0) + 1;
            return acc;
        }, {});
        res.send(counts) 
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

module.exports = adminController