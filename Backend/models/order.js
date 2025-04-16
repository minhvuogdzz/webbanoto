const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    carName: { type: String, required: true },
    viewDate: { type: Date, required: true },
    customerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'customers', 
        required: true 
    },
    orderStatus: { 
        type: String, 
        enum: ['scheduled', 'completed', 'cancelled'], 
        default: 'scheduled' 
    },
    notes: { type: String }
});

module.exports = mongoose.model("order", OrderSchema);