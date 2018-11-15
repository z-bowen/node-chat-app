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

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">Meet me here to plot against Shauna!</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser. Blame Shauna!');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }, function (error) {
    alert('Unable to fetch location, \(probably Shauna\'s fault!\)');
  });
});
