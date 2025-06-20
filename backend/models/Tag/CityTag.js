const mongoose = require('mongoose');

const CityTagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('CityTag', CityTagSchema);