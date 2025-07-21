
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User registration and login
router.post('/register', [
  check('name').notEmpty(),
  check('phone').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('gender').isIn(['male', 'female', 'other']),
  check('area').notEmpty(),
  validate
], userController.register);

router.post('/login', [
  check('email').isEmail(),
  check('password').notEmpty(),
  validate
], userController.login);

// User profile
router.get('/profile', auth, userController.getProfile);
router.put('/profile', [auth,
  check('email').optional().isEmail(),
  check('password').optional().isLength({ min: 6 }),
  validate
], userController.updateProfile);

// Get all trips for user
router.get('/trips', auth, userController.getTrips);

module.exports = router;
