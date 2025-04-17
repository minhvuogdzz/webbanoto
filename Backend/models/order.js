const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    carId: { type: String, required: true },
    date: { type: Date, required: true },
    city: { type: String, required: true },
    dealer: { type: String, required: true }
});

module.exports = mongoose.model("order", OrderSchema);