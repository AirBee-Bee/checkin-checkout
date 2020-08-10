const Room = require('../database/index.js');

describe('Database is seeded', () => {
  test('Database is seeded', () => {
    return Room.find().then(rooms => {
      var length = rooms.length;
      expect(length).toBe(100);
    });
  });
})