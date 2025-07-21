const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

// User registration and login
router.post('/register', userController.register);
router.post('/login', userController.login);

// User profile
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

// Get all trips for user
router.get('/trips', auth, userController.getTrips);

module.exports = router;
