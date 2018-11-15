var moment = require('moment');

var generateMessage = (from, text) => {
  return {from, text, createdAt: moment().format('h:mm A DD/MM/YY')}
}

var generateLocationMessage = (from, lat, lng) => {

  var url = `https://www.google.com/maps/?q=${lat},${lng}`

  return {from, url, createdAt: moment().format('h:mm A DD/MM/YY')}
}

module.exports = {generateMessage, generateLocationMessage}
