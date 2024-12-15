"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve React App static files
const reactBuildPath = path_1.default.join(__dirname, '../../client/build');
app.use(express_1.default.static(reactBuildPath));
// Routes
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(reactBuildPath, 'index.html'));
});
// Create an HTTP server to integrate with Socket.IO
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*', // Update this with your frontend's actual origin in production
    },
});
// Set up Socket.IO connection
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    // Handle a custom event (e.g., "message")
    socket.on('message', (data) => {
        console.log(`Message from client ${socket.id}:`, data);
        // Emit a response to the client
        socket.emit('response', `Server received: ${data}`);
    });
    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
// Start the server
httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
