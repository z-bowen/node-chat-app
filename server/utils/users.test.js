var expect = require('expect');

var {Users} = require('./users');


describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Alice',
      room: 'room 1'
    },
    {
      id: 2,
      name: 'Bob',
      room: 'room 2'
    },
    {
      id: 3,
      name: 'Claire',
      room: 'room 2'
    }];
  });

  it('should add new user', () => {
      var users = new Users();
      var user = {
        id: 123,
        name: 'Zach',
        room: 'some room'
      };
      users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var removedUser = users.removeUser(3);

    expect(removedUser).toEqual({
      id: 3,
      name: 'Claire',
      room: 'room 2'
    });

    expect(users.users).toEqual([{
      id: 1,
      name: 'Alice',
      room: 'room 1'
    }, {
      id: 2,
      name: 'Bob',
      room: 'room 2'
    }]);
  });

  it('should not remove a user when a bad id is given', () => {
    var removedUser = users.removeUser(0);

    expect(removedUser).toNotExist();

    expect(users.users).toEqual([{
      id: 1,
      name: 'Alice',
      room: 'room 1'
    }, {
      id: 2,
      name: 'Bob',
      room: 'room 2'
    }, {
      id: 3,
      name: 'Claire',
      room: 'room 2'
    }]);
  });

  it('should get a user by id', () => {
    var user = users.getUser(1);
    expect(user).toEqual({
      id: 1,
      name: 'Alice',
      room: 'room 1'
    })
  });

  it('should not get a user when the id doesn\'t match', () => {
    var user = users.getUser(0);
    expect(user).toNotExist();
  });

  it('should get the users in a room', () => {
    expect(users.getUserList('room 2')).toEqual(['Bob', 'Claire']);
  })
});
