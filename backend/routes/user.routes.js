const express = require('express')
const {body}=require('express-validator');
const UserController = require('../controllers/user.controller');
const router= express.Router(); 
const getid = require('../middleware/getid.middleware');

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('area').notEmpty().withMessage('Area is required'),
    body('profilePic').optional().isURL().withMessage('Profile picture must be a valid URL')
], UserController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], UserController.loginUser);

router.get('/getprofile', getid , UserController.getProfile)

router.put('/updateprofile', getid, UserController.editProfile)

router.post('/resetpassword',[
    body('email').notEmpty().withMessage('email is required'),
    body('oldPassword').notEmpty().withMessage('Old password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
], UserController.resetPassword)



module.exports = router;