
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');


const DriverSchema=mongoose.Schema({
    
    user:{type:mongoose.Schema.Types.ObjectId ,ref:'GeneralUser'},
    createdAt:{type:mongoose.Schema.Types.Date,default:Date.now},
    workingStatus:{type:Boolean,default:false},
    verifyStatus:{type:Boolean,default:false},
    application:{type:mongoose.Schema.Types.ObjectId,ref:'DriverApplication',select:false}

});


DriverSchema.methods.generateAuthToken = function () {
     const driver = this;
    const token = jwt.sign({ _id: driver._id.toString() }, process.env.JWT_SECRET);
    return token;
}

module.exports=mongoose.model('Driver',DriverSchema);