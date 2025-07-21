const express = require('express');
const router = express.Router();

// You should implement this middleware to protect trip routes
const auth = require('../middleware/auth.middleware');
const tripController = require('../controllers/trip.controller');

// Create a new trip
router.post('/', auth, tripController.createTrip);

// Get all trips for the user
router.get('/', auth, tripController.getTrips);

// Get trip details
router.get('/:id', auth, tripController.getTripById);

// Cancel a trip
router.patch('/:id/cancel', auth, tripController.cancelTrip);

// Complete a trip
router.patch('/:id/complete', auth, tripController.completeTrip);

module.exports = router;
