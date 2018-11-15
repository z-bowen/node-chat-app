var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var date = new Date(message.createdAt);
  var d = date.getDate();
  var mon = date.getMonth() + 1;
  var y = date.getFullYear();
  var hour = date.getHours() - 1;
  var h = (hour % 12) + 1;
  var amPm = (hour < 12) ? 'am' : 'pm'
  var m = date.getMinutes();
  console.log(`New message from ${message.from} (${d}/${mon}/${y} ${h}:${m} ${amPm}): ${message.text}`);
  var li = jQuery('<li></li>')
  li.text(`New message from ${message.from} (${d}/${mon}/${y} ${h}:${m} ${amPm}): ${message.text}`)
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
