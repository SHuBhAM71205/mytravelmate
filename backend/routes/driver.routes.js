const express = require('express');
const { body } = require('express-validator');
const router= express.Router();

const DriverController = require('../controllers/driver.controller');
const getId= require('../middleware/getid.middleware');


// basic

router.post('/createdriver', [], DriverController.createDriver);

router.post('/login', [], DriverController.loginDriver);

router.get('/getprofile', DriverController.getDriverProfile);

router.put('/updateprofile', [], DriverController.updateDriverProfile);

router.put('/updatepassword',[], DriverController.updateDriverPassword);

// trip related

router.put('/setworkingstatus/:status', [], getId, DriverController.setWorkingStatus);

router.get('/triphistory', [], DriverController.getTripHistory);

router.get('/getmytrips', [], DriverController.getMyTrips);

// vehicle related

router.post('/addvehicle', [], DriverController.addVehicle);

router.get('/getvehicles', [], DriverController.getVehicles);

router.delete('/deletevehicle/:vehicleId', [], DriverController.deleteVehicle);

// stats of user

router.get('/stats', [], DriverController.getDriverStats);



module.exports=router;