const GeneralUser=require('../models/User/GeneralUser');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

 
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const user = await userService.createUser(req.body);
        
        const token = user.generateAuthToken();

        res.status(201).json({ user, token });
    
    } catch (error) {
    
        next(error);
    
    }

    next();
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const isMatch = await userService.authenticateUser({ email, password });
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = isMatch.generateAuthToken();
        res.status(200).json({ user: isMatch, token });

    } catch (error) {

        next(error);

    }

    next();
}

module.exports.getProfile= async(req,res,next)=>{
    
    const Profile = await userService.getProfile(req.userId);
    
    if(!Profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json({ Profile });
    
    next();
}


module.exports.editProfile =async (req,res,next) => {
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

    const user = await userService.updateProfile(userid, updateFields);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
}

module.exports.resetPassword =async (req,res,next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email,oldPassword, newPassword } = req.body;

    const isMatch = await userService.authenticateUser({ email, password: oldPassword });


    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid old password' });
    }

    const user= await userService.resetPassword(email, oldPassword, newPassword);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }   

    res.status(200).json({ message: 'Password reset successful' });
    next();

}

