const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
});

app.use(cors());
app.use(express.json());

// Socket.io Real-Time Event Handling for Staff Workflows
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join role/restaurant specific rooms
  socket.on('join_room', (roomKey) => {
    socket.join(roomKey);
    console.log(`Socket ${socket.id} joined room: ${roomKey}`);
  });

  // Chef -> Driver / Waiter notification sync
  socket.on('update_order_status', (data) => {
    // data: { orderId, status, restaurantId, targetRole }
    io.to(data.restaurantId).emit('order_status_updated', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`ROMS Server running on port ${PORT}`);
});