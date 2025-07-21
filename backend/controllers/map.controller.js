const { validationResult } = require('express-validator');
const Driver = require('../models/Drivers/Driver');

// Find nearby drivers
exports.nearbyDrivers = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { lng, lat, radius = 5000 } = req.query; // radius in meters
        const drivers = await Driver.find({
            isAvailable: true,
            isBlocked: false,
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: parseInt(radius)
                }
            }
        }).select('-password');
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get route between two points (stub)
exports.getRoute = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // You would integrate with a mapping API here (e.g., Google Maps, Mapbox)
    res.json({ message: 'Route calculation not implemented. Integrate with a mapping API.' });
};
