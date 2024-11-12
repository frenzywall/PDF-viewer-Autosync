const express = require('express');
const http = require('http');
const cors = require("cors");
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }
});

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));


app.use(express.static('frontend/build'));

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('change-page', (newPage) => {
    console.log('Page changed to:', newPage);

    io.emit('sync-page', newPage);
  });


  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.get('/h', (req, res) => {
  res.send("Hello from backend");
});


server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
