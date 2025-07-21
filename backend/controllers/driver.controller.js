const { validationResult } = require('express-validator');
const Driver = require('../models/Drivers/Driver');
const Trip = require('../models/Trip/Trip');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Driver registration
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, phone, email, password, gender, area, licenseNumber, vehicle } = req.body;
        const existing = await Driver.findOne({ $or: [{ email }, { phone }] });
        if (existing) return res.status(400).json({ message: 'Driver already exists' });
        const hashed = await Driver.hashPassword(password);
        const driver = new Driver({ name, phone, email, password: hashed, gender, area, licenseNumber, vehicle });
        await driver.save();
        res.status(201).json({ message: 'Driver registered' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Driver login
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const driver = await Driver.findOne({ email });
        if (!driver) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await driver.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = driver.generateAuthToken();
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get driver profile
exports.getProfile = async (req, res) => {
    try {
        const driver = await Driver.findById(req.user._id || req.user.id).select('-password');
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update driver profile
exports.updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await Driver.hashPassword(updates.password);
        }
        const driver = await Driver.findByIdAndUpdate(req.user._id || req.user.id, updates, { new: true }).select('-password');
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Set driver availability
exports.setAvailability = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { isAvailable } = req.body;
        const driver = await Driver.findByIdAndUpdate(req.user._id || req.user.id, { isAvailable }, { new: true });
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update driver location
exports.updateLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { coordinates } = req.body;
        const driver = await Driver.findByIdAndUpdate(
            req.user._id || req.user.id,
            { 'location.coordinates': coordinates, 'location.updatedAt': new Date() },
            { new: true }
        );
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all trips for driver
exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ driver: req.user._id || req.user.id }).populate('user');
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Accept a trip
exports.acceptTrip = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        res.json({ message: 'Trip accepted', trip });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Reject a trip
exports.rejectTrip = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        res.json({ message: 'Trip rejected', trip });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
