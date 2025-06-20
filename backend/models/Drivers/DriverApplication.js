const mongoose=require('mongoose');

const DriverApplicationSchema=mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    licenseNumber: {
        type: String,
        required: true
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'StatusTag'
    },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('DriverApplication',DriverApplicationSchema)