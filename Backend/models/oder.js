const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;