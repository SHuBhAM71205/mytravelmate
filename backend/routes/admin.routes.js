const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin.middleware');
const adminController = require('../controllers/admin.controller');

// Admin login
router.post('/login', adminController.login);

// Get admin profile
router.get('/profile', isAdmin, adminController.getProfile);

// User management
router.get('/users', isAdmin, adminController.listUsers);
router.patch('/users/:id/block', isAdmin, adminController.blockUser);
router.patch('/users/:id/unblock', isAdmin, adminController.unblockUser);

// Driver management
router.get('/drivers', isAdmin, adminController.listDrivers);
router.patch('/drivers/:id/approve', isAdmin, adminController.approveDriver);
router.patch('/drivers/:id/reject', isAdmin, adminController.rejectDriver);

// Trip management
router.get('/trips', isAdmin, adminController.listTrips);

module.exports = router;
