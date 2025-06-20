const Driver = require('../models/Drivers/Driver');
const DriverApplication = require('../models/Drivers/DriverApplication');
const Vehicle = require('../models/Vehicle/Vehicle');



module.exports.getDriverProfile = async (driverId) => {
    try {
        const driver = await Driver.findById(driverId).populate('vehicle').populate('user');
        return driver;
    } catch (error) {
        throw new Error('Error fetching driver profile: ' + error.message);
    }
}


module.exports.createDriver = async (driverData) => {
    
}


module.exports.setWorkingStatus = async (driverId, workingStatus) => {
    try {
        const driver = await Driver.findById(driverId);
        if (!driver) {
            throw new Error('Driver not found');
        }
        driver.workingStatus = workingStatus;
        await driver.save();
        return driver;
    } catch (error) {
        throw new Error('Error setting working status: ' + error.message);
    }
}