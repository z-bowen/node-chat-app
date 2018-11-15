const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public')

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('Someone else wants to mock Shauna!');

  socket.emit('newMessage', generateMessage('Admin', 'Let\'s mock Shauna!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user is here to mock Shauna!'));

  socket.on('createMessage', (message, callback) => {
    console.log(`New message from ${message.from}: ${message.text}`);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage("Admin", coords.lat, coords.lng))
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
