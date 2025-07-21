
const express = require('express');
const { query, validationResult } = require('express-validator');
const router = express.Router();
const mapController = require('../controllers/map.controller');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Find nearby drivers
router.get('/nearby-drivers', [
  query('lng').notEmpty().isFloat(),
  query('lat').notEmpty().isFloat(),
  query('radius').optional().isInt({ min: 1 }),
  validate
], mapController.nearbyDrivers);

// Get route between two points
router.get('/route', [
  query('origin').notEmpty(),
  query('destination').notEmpty(),
  validate
], mapController.getRoute);

module.exports = router;
