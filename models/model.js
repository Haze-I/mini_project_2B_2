const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    data: {
        required: true,
        type: String,
    },
    sendingAddress: {
        required: true,
        type: String,
    },
    recievingAddress: {
        required: true,
        type: String,
    },
    payment: {
        required: true,
        type: Number,
    },
});

module.exports = mongoose.model("Data", invoiceSchema);
