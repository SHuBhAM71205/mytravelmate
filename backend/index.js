require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // required for socket.io
const port = process.env.PORT || 5000;

// Connect DB
const conn = require('./db.js');
conn();

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
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/admin', require('./routes/admin.routes.js'));
app.use('/api/driver', require('./routes/driver.routes.js'));
app.use('/api/user', require('./routes/user.routes.js'));



const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND,
    credentials: true
  }
});

// Optional: auth middleware for socket
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   // Verify token and attach user/driver
//   next();
// });

io.on('connection', (socket) => {
  console.log(' Socket connected:', socket.id);

  socket.on('start-trip', (tripId) => {
    socket.join(`trip-${tripId}`);
    console.log(` ${socket.id} joined trip-${tripId}`);
  });

  socket.on('driver-location', ({ tripId, location }) => {
    console.log(` Location for trip ${tripId}:`, location);
    io.to(`trip-${tripId}`).emit('location-update', location);
  });

  socket.on('disconnect', () => {
    console.log(' Socket disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(` TravelMate API + WebSocket running on http://localhost:${port}`);
});
