const express = require("express");
const Model = require("../models/model");
const router = express.Router();
require("dotenv").config();

//Post Method
router.post("/create", async (req, res) => {
    const invoice = new Model({
        name: req.body.name,
        data: req.body.data,
        sendingAddress: req.body.sendingAddress,
        recievingAddress: req.body.recievingAddress,
        payment: req.body.payment,
    });

    try {
        const apiKey = process.env.API_KEY;
        const appid = req.query.apiKey;

        if (appid == apiKey) {
            const invoiceToCreate = await invoice.save();
            res.status(200).json(invoiceToCreate);
        } else {
            res.status(400).json({ message: "Missing or Wrong API Key" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get all Method
router.get("/viewInvoices", async (req, res) => {
    try {
        const invoice = await Model.find();
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete by ID Method
router.delete("/delete", async (req, res) => {
    try {
        const id = req.query.id;
        const apiKey = process.env.API_KEY;
        const appid = req.query.apiKey;
        if (appid == apiKey) {
            const invoice = await Model.findByIdAndDelete(id);
            res.send(`Document with the name ${invoice.name} has been deleted..`);
        } else {
            res.status(400).json({ message: "Missing or wrong API Key" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete all
router.delete("/deleteAll", async (req, res) => {
    try {
        const apiKey = process.env.API_KEY;
        const appid = req.query.apiKey;
        if (appid == apiKey) {
            const invoice = await Model.deleteMany();
            res.send(`All entries cleared`);
        } else {
            res.status(400).json({ message: "Wrong or Missing API Key" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//API-Key request
router.get("/requestKey", (req, res) => {
    try {
        res.json({ API_KEY: process.env.API_KEY });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
