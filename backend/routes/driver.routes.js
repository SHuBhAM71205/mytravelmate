const express = require('express');
const router = express.Router();

// You should implement this middleware to protect driver routes
const auth = require('../middleware/auth.middleware');
const driverController = require('../controllers/driver.controller');

// Driver registration and login
router.post('/register', driverController.register);
router.post('/login', driverController.login);

// Driver profile
router.get('/profile', auth, driverController.getProfile);
router.put('/profile', auth, driverController.updateProfile);

// Set driver availability
router.patch('/availability', auth, driverController.setAvailability);

// Update driver location
router.patch('/location', auth, driverController.updateLocation);

// Trip management for drivers
router.get('/trips', auth, driverController.getTrips);
router.patch('/trips/:id/accept', auth, driverController.acceptTrip);
router.patch('/trips/:id/reject', auth, driverController.rejectTrip);

module.exports = router;
