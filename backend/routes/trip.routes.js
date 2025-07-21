
const express = require('express');
const { check, validationResult, param } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const tripController = require('../controllers/trip.controller');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create a new trip
router.post('/', [auth,
  check('driver').notEmpty(),
  check('origin').notEmpty(),
  check('destination').notEmpty(),
  check('fare').isNumeric(),
  validate
], tripController.createTrip);

// Get all trips for the user
router.get('/', auth, tripController.getTrips);

// Get trip details
router.get('/:id', [auth, param('id').isMongoId(), validate], tripController.getTripById);

// Cancel a trip
router.patch('/:id/cancel', [auth, param('id').isMongoId(), validate], tripController.cancelTrip);

// Complete a trip
router.patch('/:id/complete', [auth, param('id').isMongoId(), validate], tripController.completeTrip);

module.exports = router;
