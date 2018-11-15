const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public')

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit from Admin text: welcome to the chat
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));
  // socket.broadcast.emit from Admin text: new user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat'));

  socket.on('createMessage', (message) => {
    console.log(`New message from ${message.from}: ${message.text}`);
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
