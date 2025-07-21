const express = require('express');
const router = express.Router();

const mapController = require('../controllers/map.controller');

// Find nearby drivers
router.get('/nearby-drivers', mapController.nearbyDrivers);

// Get route between two points
router.get('/route', mapController.getRoute);

module.exports = router;
