const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model("Customer", CustomerSchema);