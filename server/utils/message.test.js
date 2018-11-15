var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('formats an email and some text as a message object', () => {
    var from = 'a user'
    var text = 'some text'
    var message = generateMessage(from, text);

    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('object');
  });
});
