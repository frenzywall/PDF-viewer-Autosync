const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

app.use(cors());


app.use(express.static('frontend/build'));


const connectedClients = new Map();


let currentPage = 1;

io.on('connection', (socket) => {
  const clientIp = socket.handshake.address;
  socket.isAdmin = false;

 
  connectedClients.set(socket.id, { ip: clientIp, isAdmin: false });

  socket.emit('sync-page', currentPage);


  socket.on('set-role', (isAdmin) => {
    socket.isAdmin = isAdmin;
    connectedClients.get(socket.id).isAdmin = isAdmin;
    console.log(`Client connected from IP: ${clientIp} | Admin: ${isAdmin}`);
  });

  socket.on('change-page', (newPage) => {
    if (socket.isAdmin) {
      currentPage = newPage;
      console.log(`Admin: ${socket.isAdmin} | IP: ${clientIp} | Page changed to: ${newPage}`);
      io.emit('sync-page', newPage);
    } else {
      console.log(`Non-admin user from IP: ${clientIp} attempted to change page to: ${newPage}`);
    }
  });


  socket.on('disconnect', () => {
    connectedClients.delete(socket.id);
    console.log(`Client from IP: ${clientIp} disconnected`);
  });
});

app.get('/clients', (req, res) => {
  res.json(Array.from(connectedClients.values()));
});

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

app.get('/current-page', (req, res) => {
  res.json({ currentPage });
});


app.post('/update-page', (req, res) => {
  const { newPage } = req.body;
  currentPage = newPage;
  io.emit('sync-page', newPage);
  res.status(200).json({ message: `Page updated to: ${newPage}` });
});


const port = process.env.PORT || 5000;
server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});