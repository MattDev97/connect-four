import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve React App static files
const reactBuildPath = path.join(__dirname, '../../client/build');
app.use(express.static(reactBuildPath));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(reactBuildPath, 'index.html'));
});

// Create an HTTP server to integrate with Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
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
