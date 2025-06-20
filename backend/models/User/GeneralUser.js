
const mongoose = require('mongoose');

const GeneralUserSchema= new mongoose.Schema({
  fname: { type: String, required: true, maxlength: 50 },
  lname: { type: String, required: true, maxlength: 50 },
  gender: { type: String, enum: ['Male', 'male','f','F'], required: true },
  area: { type: mongoose.Schema.Types.ObjectId, ref: 'CityTag' },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'RoleTag' },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  password: { type: String, required: true },
  contact: { type: String, match: /^[0-9]{10}$/ },
  createdAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model('GeneralUser',GeneralUserSchema)