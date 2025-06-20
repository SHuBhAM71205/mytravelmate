
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const GeneralUserSchema= new mongoose.Schema({
  fname: { type: String, required: true, maxlength: 50 },
  lname: { type: String, required: true, maxlength: 50 },
  gender: { type: String, enum: ['Male', 'male','f','F'], required: true },
  area: { type: mongoose.Schema.Types.ObjectId, ref: 'CityTag' },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'RoleTag' },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  password: { type: String, required: true,select:false },
  contact: { type: String, match: /^[0-9]{10}$/ },
  createdAt: { type: Date, default: Date.now },
  socketId:{type:String}
})

GeneralUserSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  return token;
}

GeneralUserSchema.methods.comparePassword = async function(candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
}

GeneralUserSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

module.exports=mongoose.model('GeneralUser',GeneralUserSchema)