const mongoose = require('mongoose');

const RoleTagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('RoleTag', RoleTagSchema);