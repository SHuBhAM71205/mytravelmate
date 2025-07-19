const { validationResult } = require('express-validator');

const GeneralUser = require('../models/User/GeneralUser');
const driverService = require('../services/driver.service');
const Driver = require('../models/Drivers/Driver');

module.exports.createDriver = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const driver = await driverService.createDriver(req.body);
        res.status(201).json({ driver });
    } catch (error) {
        next(error);
    }
}

module.exports.getDriverProfile = async (req, res, next) => {
    try {
        const driver = await driverService.getDriverProfile(req.params.id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.status(200).json({ driver });
    } catch (error) {
        next(error);
    }
}

module.exports.loginDriver = async (req, res, next) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const isMatch = await driverService.authenticateDriver(email, password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        

        const token = isMatch.generateAuthToken();

        res.status(200).json({ token , driver: isMatch });

    } catch (error) {
        next(error);
    }

}

module.exports.setWorkingStatus = async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { workingStatus } = req.params;
        const driver = await driverService.setWorkingStatus(req.userId, workingStatus);
        res.status(200).json({ driver });
    } catch (error) {
        next(error);
    }
}

module.exports.updateDriverProfile = async (req, res, next) => {
    const userid = req.userId;
    const { name, phone,email,area,gender } = req.body;
    const updateFields = {};
    if(name) {
        updateFields.name = name;
    }
    if(phone) {
        updateFields.phone = phone;
    }
    if(email) {
        updateFields.email = email;
    }
    if(area) {
        updateFields.area = area;
    }   
    if(gender) {
        updateFields.gender = gender;
    }

    const user = await driverService.updateProfile(userid, updateFields);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
}

module.exports.updateDriverPassword = async (req, res, next) => {
}

module.exports.getDriverStats = async (req, res, next) => {
}

module.exports.startTrip = async (req, res, next) => {
}

module.exports.endTrip = async (req, res, next) => {
}

module.exports.getCurrentTrip = async (req, res, next) => {
}

module.exports.getTripHistory = async (req, res, next) => {

}

module.exports.getMyTrips = async (req, res, next) => {

}


module.exports.addVehicle = async (req, res, next) => {

}

module.exports.getVehicles = async (req, res, next) => {
}

module.exports.deleteVehicle = async (req, res, next) => {
    
}

module.exports.getDriverStats = async (req, res, next) => {
}