const Trip = require('../models/Trip/Trip');
const Driver = require('../models/Drivers/Driver');
const GeneralUser = require('../models/User/GeneralUser');

// Create a new trip
exports.createTrip = async (req, res) => {
    try {
        const { driver, origin, destination, fare } = req.body;
        const trip = new Trip({
            user: req.user._id || req.user.id,
            driver,
            origin,
            destination,
            fare,
            status: 'requested'
        });
        await trip.save();
        res.status(201).json(trip);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all trips for the user
exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user._id || req.user.id }).populate('driver');
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get trip details
exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('user driver');
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        res.json(trip);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Cancel a trip
exports.cancelTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        res.json({ message: 'Trip cancelled', trip });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Complete a trip
exports.completeTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, { status: 'completed', endedAt: new Date() }, { new: true });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        res.json({ message: 'Trip completed', trip });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
