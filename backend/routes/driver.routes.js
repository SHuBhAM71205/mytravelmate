
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const driverController = require('../controllers/driver.controller');

// Validation result handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Driver registration and login
router.post('/register', [
  check('name').notEmpty(),
  check('phone').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('gender').isIn(['male', 'female', 'other']),
  check('area').notEmpty(),
  check('licenseNumber').notEmpty(),
  validate
], driverController.register);

router.post('/login', [
  check('email').isEmail(),
  check('password').notEmpty(),
  validate
], driverController.login);

// Driver profile
router.get('/profile', auth, driverController.getProfile);
router.put('/profile', [auth,
  check('email').optional().isEmail(),
  check('password').optional().isLength({ min: 6 }),
  validate
], driverController.updateProfile);

// Set driver availability
router.patch('/availability', [auth,
  check('isAvailable').isBoolean(),
  validate
], driverController.setAvailability);

// Update driver location
router.patch('/location', [auth,
  check('coordinates').isArray({ min: 2, max: 2 }),
  validate
], driverController.updateLocation);

// Trip management for drivers
router.get('/trips', auth, driverController.getTrips);
router.patch('/trips/:id/accept', auth, driverController.acceptTrip);
router.patch('/trips/:id/reject', auth, driverController.rejectTrip);

module.exports = router;
