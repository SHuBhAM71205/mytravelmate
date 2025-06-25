const dotenv = require('dotenv');
dotenv.config();
const { Server } = require('socket.io');
const process = require('process');
let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND,
            credentials: true
        }
    });

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
    return io;
}



const sendMessageToSocketId = (socketId, messageObject) => {

console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
