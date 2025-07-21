const Admin = require('../models/Admin/Admin');
const GeneralUser = require('../models/User/GeneralUser');
const Driver = require('../models/Drivers/Driver');
const Trip = require('../models/Trip/Trip');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = admin.generateAuthToken();
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get admin profile
exports.getProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).select('-password');
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// List all users
exports.listUsers = async (req, res) => {
    try {
        const users = await GeneralUser.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Block a user
exports.blockUser = async (req, res) => {
    try {
        const user = await GeneralUser.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User blocked', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Unblock a user
exports.unblockUser = async (req, res) => {
    try {
        const user = await GeneralUser.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User unblocked', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// List all drivers
exports.listDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().select('-password');
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Approve a driver
exports.approveDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
        if (!driver) return res.status(404).json({ message: 'Driver not found' });
        res.json({ message: 'Driver approved', driver });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Reject a driver
exports.rejectDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndUpdate(req.params.id, { isVerified: false }, { new: true });
        if (!driver) return res.status(404).json({ message: 'Driver not found' });
        res.json({ message: 'Driver rejected', driver });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// List all trips
exports.listTrips = async (req, res) => {
    try {
        const trips = await Trip.find().populate('user driver');
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

