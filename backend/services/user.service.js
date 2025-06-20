const GeneralUser=require('../models/User/GeneralUser');

module.exports.createUser = async ({ fname, lname, gender, email, password, contact, area, role }) => {
    if (!fname || !lname || !gender || !email || !password || !contact || !area || !role) {
        throw new Error('All fields are required');
    }
    try {
        const user = new GeneralUser({ fname, lname, gender, email, password, contact, area, role });
        user.password = await GeneralUser.hashPassword(user.password);
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}


module.exports.authenticateUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    try {
        const user = await GeneralUser.findOne({ email }).select('+password');
        
        if (!user) {
            throw new Error('Invalid email or password');
        }
        
        const isMatch = await GeneralUser.comparePassword(password, user.password);
        
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        
        return user;
    } catch (error) {
        
        throw new Error('Error authenticating user: ' + error.message);
    }
}


module.exports.getProfile  = async (userid) => {
    if (!userid) {
        throw new Error('User ID is required');
    }
    try {
        const user = await GeneralUser.findById(userid);
        if(!user)
        {
            throw new Error('User not found');
        }
        return user;
    }
    catch (error) {
        throw new Error('Error fetching user profile: ' + error.message);
    }
}