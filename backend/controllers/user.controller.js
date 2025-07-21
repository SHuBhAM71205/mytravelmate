const { validationResult } = require('express-validator');
const GeneralUser = require('../models/User/GeneralUser');
const Trip = require('../models/Trip/Trip');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, phone, email, password, gender, area } = req.body;
        const existing = await GeneralUser.findOne({ $or: [{ email }, { phone }] });
        if (existing) return res.status(400).json({ message: 'User already exists' });
        const hashed = await GeneralUser.hashPassword(password);
        const user = new GeneralUser({ name, phone, email, password: hashed, gender, area });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User login
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await GeneralUser.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = user.generateAuthToken();
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await GeneralUser.findById(req.user._id || req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await GeneralUser.hashPassword(updates.password);
        }
        const user = await GeneralUser.findByIdAndUpdate(req.user._id || req.user.id, updates, { new: true }).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all trips for user
exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user._id || req.user.id }).populate('driver');
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
