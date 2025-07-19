const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const connectDB = require('./db');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

(async () => {
    try {
        await connectDB();
        initializeSocket(server);

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server. Database connection failed.", error);
        process.exit(1);
    }
})();