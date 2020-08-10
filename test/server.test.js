const Room = require('../database/index.js');

describe('Database is seeded', () => {
  test('Database is seeded', () => {
    var rooms = Room.find();
    var length = rooms.length;
    expect(length).toBe(100);
  });

  test('Database is mostly random', () => {
    var random = Math.floor((Math.random() * 100) + 1);
    if (random === 100) {
      var next = 99;
    } else {
      next = random + 1;
    }
    var room1 = Room.find({uniqueId: random});
    var room2 = Room.find({uniqueId: next});

    var sameValues = [];
    for (var keys in room1[0]) {

        if (room1[0][keys] === room2[0][keys]) {
          sameValues.push({keys: room1[0][keys]})
        }

    }
    return sameValues;
  })
})