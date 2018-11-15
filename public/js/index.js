var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'client@example.com',
    text: 'Hi, I\'m the client!'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log(`New message from ${message.from} at ${message.timeStamp}: ${message.text}`);
})
