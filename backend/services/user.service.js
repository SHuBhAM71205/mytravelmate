const GeneralUser=require('../models/User/GeneralUser');

module.exports.createUser = async ({ name, phone, email, password, gender, area }) => {
    if (!name|| !email || !password || !phone || !area || !gender) {
        throw new Error('All fields are required');
    }
    try {
        const user = new GeneralUser({ name, phone, email, password, gender, area });
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


module.exports.updateProfile = async (userid, updateFields) => {
    if (!userid || !updateFields) {
        throw new Error('User ID and update fields are required');
    }
    try {
        const user = await GeneralUser.findByIdAndUpdate(userid, updateFields, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error updating user profile: ' + error.message);
    }
}

module.exports.resetPassword = async (email, oldPassword, newPassword) => {

    const user = await GeneralUser.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('User not found');
    }

    if (!newPassword || newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long');
    }
    if (newPassword === oldPassword) {
        throw new Error('New password cannot be the same as the old password');
    }
    // Hash the new password before saving
    const hashedNewPassword = await GeneralUser.hashPassword(newPassword);

    user.password = hashedNewPassword;

    await user.save();
    return user;
}