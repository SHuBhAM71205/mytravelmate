
const express = require('express');
const { check, validationResult, param } = require('express-validator');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin.middleware');
const adminController = require('../controllers/admin.controller');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Admin login
router.post('/login', [ 
  check('email').isEmail(),
  check('password').notEmpty(),
  validate
], adminController.login);

// Get admin profile
router.get('/profile', isAdmin, adminController.getProfile);

// User management
router.get('/users', isAdmin, adminController.listUsers);
router.patch('/users/:id/block', [isAdmin, param('id').isMongoId(), validate], adminController.blockUser);
router.patch('/users/:id/unblock', [isAdmin, param('id').isMongoId(), validate], adminController.unblockUser);

// Driver management
router.get('/drivers', isAdmin, adminController.listDrivers);
router.patch('/drivers/:id/approve', [isAdmin, param('id').isMongoId(), validate], adminController.approveDriver);
router.patch('/drivers/:id/reject', [isAdmin, param('id').isMongoId(), validate], adminController.rejectDriver);

// Trip management
router.get('/trips', isAdmin, adminController.listTrips);

module.exports = router;
