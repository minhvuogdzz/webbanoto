const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: {type: String , require: true},
    URL: { type: String, required: true },
    Fuel: { type: String, enum: ['GAS', 'DIESEL', 'ELECTRIC', 'HYBRID'], required: true },
    Type: { type: String, enum: ['SUV', 'SEDAN', 'TRUCK', 'COUPE', 'HATCHBACK'], required: true },
    Price: { type: Number, required: true }
});
module.exports = mongoose.model('Car', carSchema);