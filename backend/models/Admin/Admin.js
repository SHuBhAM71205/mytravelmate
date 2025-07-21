const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true, 
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, 
  },
  phone: { type: String, unique: true, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  area: { type: String, required: true },
  profilePic: String,
  isBlocked: { type: Boolean, default: false }
}, { timestamps: true });


adminSchema.pre('save', async function (next) {
  
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

adminSchema.methods.generateAuthToken = function () {
  const payload = {
    id: this._id,
    email: this.email,
    role: 'admin',
  };
  
  return jwt.sign(payload, process.env.JWT_ADMIN_SECRET, { expiresIn: '24h' });
};

module.exports = mongoose.model('Admin', adminSchema);