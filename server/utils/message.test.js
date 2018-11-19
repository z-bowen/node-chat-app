var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('formats an email and some text as a message object', () => {
    var from = 'a user'
    var text = 'some text'
    var message = generateMessage(from, text);

    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    var from = 'user'
    var lat = '10.10101'
    var lng = '-20.12345'
    var url = `https://www.google.com/maps/?q=${lat},${lng}`
    var message = generateLocationMessage(from, lat, lng)

    expect(message).toInclude({from, url});
    expect(message.createdAt).toBeA('number');
  });
})
