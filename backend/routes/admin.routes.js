const express = require('express')

const router= express.Router();
const AdminController = require('../controllers/admin.controller');


router.post('/admin/login', AdminController.loginAdmin);

router.get('/admin/profile', isAdmin, AdminController.getProfile);
router.put('/admin/updateprofile', isAdmin, AdminController.updateProfile);
router.put('/admin/changepassword', isAdmin, AdminController.changePassword);


router.get('/admin/users', isAdmin, AdminController.getAllUsers);
router.get('/admin/user/:id', isAdmin, AdminController.getUserById);
router.put('/admin/user/:id', isAdmin, AdminController.editUserById);
router.delete('/admin/user/:id', isAdmin, AdminController.deleteUserById);


router.get('/admin/stats', isAdmin, AdminController.getSiteStats);
router.get('/admin/monthly-activity', isAdmin, AdminController.getMonthlyUserActivity);


module.exports=router;