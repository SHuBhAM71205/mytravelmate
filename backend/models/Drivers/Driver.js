const { application } = require('express');
const mongoose=require('mongoose');

const DriverSchema=mongoose.Schema({
    
    user:{type:mongoose.Schema.Types.ObjectId ,ref:'GeneralUser'},
    createdAt:{type:mongoose.Schema.Types.Date,default:Date.now},
    workingStatus:{type:Boolean,default:false},
    verifyStatus:{type:Boolean,default:false},
    application:{type:mongoose.Schema.Types.ObjectId,ref:'DriverApplication'},

});

module.exports=mongoose.model('Driver',DriverSchema);