const Driver = require('../models/Drivers/Driver');


module.exports.getDriverProfile = async (driverId) => {
    try {
        const driver = await Driver.findById(driverId,'-password');
        return driver;
    } catch (error) {
        throw new Error('Error fetching driver profile: ' + error.message);
    }
}


module.exports.createDriver = async (driverData) => {
    const driver = new Driver(driverData);
    try {
        await driver.save();
        return driver;
    } catch (error) {
        throw new Error('Error creating driver: ' + error.message);
    }
}

module.exports.authenticateDriver = async (email, password) => {
    try {
        const driver = await Driver.find
    }
    catch (error) {
        throw new Error('Error authenticating driver: ' + error.message);
    }

}

module.exports.setWorkingStatus = async (driverId, workingStatus) => {
    try {
        const driver = await Driver.findById(driverId);
        if (!driver) {
            throw new Error('Driver not found');
        }
        driver.isAvailable = workingStatus;
        await driver.save();
        return driver;
    } catch (error) {
        throw new Error('Error setting working status: ' + error.message);
    }
}