// backend/server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow requests from the Vite frontend
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 8000;

// Handle client connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for drawing events
  socket.on('drawing', (data) => {
    // Broadcast drawing data to other clients
    socket.broadcast.emit('drawing', data);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
