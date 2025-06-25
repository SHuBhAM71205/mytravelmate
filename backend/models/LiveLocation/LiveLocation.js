
const mongoose = require('mongoose');

const liveLocationSchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  coordinates: { type: [Number], required: true }, // [lng, lat]
  timestamp: { type: Date, default: Date.now }
});

liveLocationSchema.index({ timestamp: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('LiveLocation', liveLocationSchema);
