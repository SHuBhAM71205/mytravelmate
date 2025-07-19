const express = require('express');
const {param, body } = require('express-validator');
const router= express.Router();

const DriverController = require('../controllers/driver.controller');
const getId= require('../middleware/getid.middleware');

// basic

router.post('/createdriver', [
    body('name').notEmpty().withMessage('Name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('area').notEmpty().withMessage('Area is required'),
    body('vehicle.model').notEmpty().withMessage('Vehicle model is required'),
    body('vehicle.plateNumber').notEmpty().withMessage('Vehicle plate number is required'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('licenseNumber').notEmpty().withMessage('License number is required'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender is required and must be one of: male, female, other')
], DriverController.createDriver);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], DriverController.loginDriver);

router.get('/getprofile', getId,DriverController.getDriverProfile);

router.put('/updateprofile', getId, DriverController.updateDriverProfile);

router.put('/updatepassword',[], DriverController.updateDriverPassword);

// trip related

router.put('/setworkingstatus/:status',getId,[
        param('status')
            .isBoolean()
            .withMessage('Status must be a boolean value'),
        ],
        DriverController.setWorkingStatus
);

router.get('/triphistory', [], DriverController.getTripHistory);

router.get('/getmytrips', [], DriverController.getMyTrips);

// vehicle related

router.post('/addvehicle', [], DriverController.addVehicle);

router.get('/getvehicles', [], DriverController.getVehicles);

router.delete('/deletevehicle/:vehicleId', [], DriverController.deleteVehicle);

// stats of user

router.get('/stats', [], DriverController.getDriverStats);



module.exports=router;