var generateMessage = (from, text) => {
  return {from, text, createdAt: new Date()}
}

var generateLocationMessage = (from, lat, lng) => {

  var url = `https://www.google.com/maps/?q=${lat},${lng}`

  return {from, url, createdAt: new Date()}
}

module.exports = {generateMessage, generateLocationMessage}
