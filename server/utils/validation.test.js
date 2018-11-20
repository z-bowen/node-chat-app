const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(!isRealString(3));
  });

  it('should reject strings with only spaces', () => {
    expect(!isRealString('   '));
  });

  it('should accept strings with non-space characters', () => {
    expect(isRealString('   abc123   '));
  });
});
