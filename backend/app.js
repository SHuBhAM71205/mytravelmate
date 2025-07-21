const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

      const app = express();

// routes
const  userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const driverRoutes = require('./routes/driver.routes');
const tripRoutes = require('./routes/trip.routes');
const mapRoutes = require('./routes/map.routes');

// Middleware

app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true,
  exposedHeaders: ['Auth-Token']
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(' TravelMate API + WebSocket is running');
});

app.use('/api/admin', adminRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/user', userRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/map', mapRoutes);

module.exports = app;