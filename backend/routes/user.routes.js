const express = require('express')
const {body}=require('express-validator');
const UserController = require('../controllers/user.controller');
const router= express.Router(); 
const getid = require('../middleware/getid.middleware');

router.post('/register', [], UserController.registerUser);

router.post('/login', [], UserController.loginUser);

router.get('/getprofile',[], getid , UserController.getProfile)

router.put('/updateprofile',[],UserController.editProfile)

router.post('/resetpassword',[],UserController.resetPassword)



module.exports = router;