const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    vehicleTag: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'vehicleTag',
        required: true
    },
    registration: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    documentCopy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);