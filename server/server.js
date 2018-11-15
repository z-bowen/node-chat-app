const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public')

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit from Admin text: welcome to the chat
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat!',
    createdAt: new Date()
  });
  // socket.broadcast.emit from Admin text: new user joined
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined the chat',
    createdAt: new Date()
  });

  socket.on('createMessage', (message) => {
    console.log(`New message from ${message.from}: ${message.text}`);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
