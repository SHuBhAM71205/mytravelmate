const express = require('express')
const {body}=require('express-validator');
const TripController = require('../controllers/trip.controller');
const router= express.Router(); 

router.post('/createtrip', [], TripController.createTrip);

router.get('/gettrip/:tripId', [], TripController.getTripDetails);

router.put('/updatetrip/:tripId', [], TripController.updateTrip);

router.delete('/deletetrip/:tripId', [], TripController.deleteTrip);

router.put('/starttrip/:tripId', [], TripController.startTrip);

router.put('/endtrip/:tripId', [], TripController.endTrip);

router.get('/mytrips/:userId', [], TripController.getUserTrips);

router.put('/rate/:tripId', [], TripController.rateTrip);

router.get('/fare/:tripId', authMiddleware, TripController.getFareDetails);

router.post('/pay/:tripId', authMiddleware, TripController.makePayment);


module.exports = router;