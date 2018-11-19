var moment = require('moment');

var generateMessage = (from, text) => {
  return {from, text, createdAt: moment().valueOf()}
}

var generateLocationMessage = (from, lat, lng) => {

  var url = `https://www.google.com/maps/?q=${lat},${lng}`

  return {from, url, createdAt: moment().valueOf()}
}

module.exports = {generateMessage, generateLocationMessage}
