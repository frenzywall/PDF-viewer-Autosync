const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Configure socket.io with CORS settings
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow connections from any origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

// Enable CORS for the backend API
app.use(cors());

// Serve the static files from the frontend build folder
app.use(express.static('frontend/build'));

// Keep track of connected clients
const connectedClients = new Map();

// Store the current page state
let currentPage = 1;

// Socket.io connection handler
io.on('connection', (socket) => {
  const clientIp = socket.handshake.address;
  socket.isAdmin = false;

  // Add the new client to the connected clients map
  connectedClients.set(socket.id, { ip: clientIp, isAdmin: false });

  // Sync the current page with the new client
  socket.emit('sync-page', currentPage);

  // Listen for role setting
  socket.on('set-role', (isAdmin) => {
    socket.isAdmin = isAdmin;
    connectedClients.get(socket.id).isAdmin = isAdmin;
    console.log(`Client connected from IP: ${clientIp} | Admin: ${isAdmin}`);
  });

  // Listen for page changes
  socket.on('change-page', (newPage) => {
    if (socket.isAdmin) {
      currentPage = newPage;
      console.log(`Admin: ${socket.isAdmin} | IP: ${clientIp} | Page changed to: ${newPage}`);
      io.emit('sync-page', newPage);
    } else {
      console.log(`Non-admin user from IP: ${clientIp} attempted to change page to: ${newPage}`);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    connectedClients.delete(socket.id);
    console.log(`Client from IP: ${clientIp} disconnected`);
  });
});

// Add an API to retrieve the list of connected clients
app.get('/clients', (req, res) => {
  res.json(Array.from(connectedClients.values()));
});

// Add an API to kick a client
app.post('/kick-client', (req, res) => {
  const { socketId } = req.body;
  const client = connectedClients.get(socketId);
  if (client) {
    io.to(socketId).emit('kicked');
    connectedClients.delete(socketId);
    res.status(200).json({ message: `Kicked client from IP: ${client.ip}` });
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

// Add an API to retrieve the current page
app.get('/current-page', (req, res) => {
  res.json({ currentPage });
});

// Add an API to update the current page
app.post('/update-page', (req, res) => {
  const { newPage } = req.body;
  currentPage = newPage;
  io.emit('sync-page', newPage);
  res.status(200).json({ message: `Page updated to: ${newPage}` });
});

// Make the server listen on all available network interfaces (0.0.0.0) and a specific port (5000)
const port = process.env.PORT || 5000;
server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});