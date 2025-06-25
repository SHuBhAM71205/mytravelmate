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
        const token = user.generateAuthToken();
        res.status(200).json({ user, token });

    } catch (error) {

        next(error);

    }

    next();
}

module.exports.getProfile= async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const Profile = await userService.getProfile(req.userId);
    
    if(!Profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json({ Profile });
    
    next();
}


module.exports.editProfile =async (req,res,next) => {
    next();
}

module.exports.resetPassword =async (req,res,next) => {
    next();
}

