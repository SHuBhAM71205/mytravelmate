const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    startLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'CityTag',
        required: true
    },
    endLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'CityTag',
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    status: { 
        type: String,
        enum: ['pending', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'VehicleTag',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);