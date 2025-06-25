// models/Trip.js
const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  origin: {
    address: String,
    coordinates: { type: [Number], required: true } // [lng, lat]
  },
  destination: {
    address: String,
    coordinates: { type: [Number], required: true }
  },
  fare: { type: Number, required: true },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'requested'
  },
  distanceKm: Number,
  durationMin: Number,
  startedAt: Date,
  endedAt: Date,
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  userRating: Number,
  driverRating: Number
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);
