const express = require('express');
const { body } = require('express-validator');
const router= express.Router();

const DriverController = require('../controllers/driver.controller');
const getId= require('../middleware/getid.middleware');


router.get('/profile', DriverController.getDriverProfile);

router.post('/createdriver', [
    
    body('fname').notEmpty().withMessage('First name is required'),
    
    body('lname').notEmpty().withMessage('Last name is required'),
    
    body('gender').isIn(['Male', 'female']).withMessage('Gender must be Male or female'),

    body('email').isEmail().withMessage('Invalid email address'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('contact').matches(/^[0-9]{10}$/).withMessage('Contact number must be 10 digits long'),

    body('area').notEmpty().withMessage('Area is required'),

    body('role').notEmpty().withMessage('Role is required'),

    body('vehicle').notEmpty().withMessage('Vehicle details are required'),

    

] ,DriverController.createDriver);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
], DriverController.loginDriver);

router.put('/setworkingstatus', [
    body('workingStatus').isBoolean().withMessage('Working status must be a boolean')
], getId, DriverController.setWorkingStatus);


module.exports=router;