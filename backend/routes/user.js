const express = require('express')
const {body}=require('express-validator');
const UserController = require('../controllers/user.controller');
const router= express.Router(); 

router.post('/register', [

  body('fname').notEmpty().withMessage('First name is required'),

  body('lname').notEmpty().withMessage('Last name is required'),
  
  body('gender').isIn(['Male', 'female']).withMessage('Gender must be Male or female'),

  body('email').isEmail().withMessage('Invalid email address'),

  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('contact').matches(/^[0-9]{10}$/).withMessage('Contact number must be 10 digits long'),

  body('area').notEmpty().withMessage('Area is required'),

  body('role').notEmpty().withMessage('Role is required')


], UserController.registerUser);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], UserController.loginUser);

module.exports = router;