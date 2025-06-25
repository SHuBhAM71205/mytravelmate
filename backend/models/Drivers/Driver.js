
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');


const DriverSchema=new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  vehicle: {
    model: String,
    plateNumber: String,
    color: String
  },
  rating: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
    updatedAt: { type: Date, default: Date.now }
  }
}, { timestamps: true });


DriverSchema.methods.generateAuthToken = function () {
     const driver = this;
    const token = jwt.sign({ _id: driver._id.toString() }, process.env.JWT_SECRET);
    return token;
}

DriverSchema.index({ location: '2dsphere' });


module.exports=mongoose.model('Driver',DriverSchema);