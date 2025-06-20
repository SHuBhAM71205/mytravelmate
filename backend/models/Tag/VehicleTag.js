const mongoose = require('mongoose');

const VehicleTagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('VehicleTag', VehicleTagSchema);