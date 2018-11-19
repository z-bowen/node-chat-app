var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var template = jQuery('#message-template').html();
  var time = moment(message.createdAt).format('h:mm a DD/MM/YY');
  var {from, text} = message;
  var html = Mustache.render(template, {from, text, time});

  jQuery('#messages').append(html);

  // console.log(`New message from ${message.from} (${formattedTime}): ${message.text}`);
  // var li = jQuery('<li></li>')
  // li.text(`New message from ${message.from} (${formattedTime}): ${message.text}`)
  // jQuery('#messages').append(li);

})

socket.on('newLocationMessage', function (message) {
  var template = jQuery('#location-template').html();
  var time = moment(message.createdAt).format('h:mm a DD/MM/YY');
  var {from, url} = message;
  var html = Mustache.render(template, {from, url, time});

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">Meet me here to plot against Shauna!</a>');
  // var formattedTime = moment(message.createdAt).format('h:mm a DD/MM/YY');
  //
  // li.text(`${message.from} (${formattedTime}): `);
  // a.attr('href', message.url);
  // li.append(a);
  jQuery('#messages').append(html);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser. Blame Shauna!');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Mock Shauna in Person!');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }, function (error) {
    locationButton.removeAttr('disabled').text('Mock Shauna in Person!');
    alert('Unable to fetch location, \(probably Shauna\'s fault!\)');
  });
});
