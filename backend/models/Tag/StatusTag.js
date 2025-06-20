const mongoose = require('mongoose');

const StatusTagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    color: {
        type: String,
        required: false,
        trim: true
    }
});

module.exports = mongoose.model('StatusTag', StatusTagSchema);