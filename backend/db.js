const mongoose = require('mongoose');
require('dotenv').config();
const dbURI = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; // Re-throw the error to be caught by the caller
    }
};

module.exports = connectDB;