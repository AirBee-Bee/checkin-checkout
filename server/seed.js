const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const _ = require('lodash');

const url = 'mongodb://localhost:27017';

const dbName = 'rooms';
// this is sample code to test

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);

  const db = client.db(dbName);

  const roomsCollection = db.collection('roomsInfo');

  let rooms = [];

  for (var i = 0; i < 100; i++) {
    var uniqueId = i + 1;
    var nightlyPrice = faker.random.number({ min: 55, max: 600 });
    var weeklyPrice = faker.random.boolean();
    var monthlyPrice = faker.random.boolean();
    var avgRating = faker.finance.amount(3, 5, 2);
    var ratingNum = faker.random.number({ min: 0, max: 100 });
    var cleaningFee = faker.random.arrayElement([0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 100, 100, 150, 200, 250]);
    var serviceBase = faker.random.number({ min: 5, max: 10 });
    var taxesBase = faker.random.number({ min: 5, max: 16 });
    var minNights = faker.random.number({ min: 1, max: 3 });
    var maxNights = faker.random.number({ min: 7, max: 150 });
    var guestsIncluded = faker.random.arrayElement([1, 1, 2, 1, 1, 2, 2, 8, 2, 1, 4, 4, 6, 4, 6, 4, 6, 1, 10]);
    var pricePerGuest = faker.random.number({ min: 20, max: 70 });
    var numberOfGuests = faker.random.number({ min: 4, max: 12 });
    var datesUnavail = [];

    let newRoom = {
      uniqueId,
      nightlyPrice,
      weeklyPrice,
      monthlyPrice,
      avgRating,
      ratingNum,
      cleaningFee,
      serviceBase,
      taxesBase,
      minNights,
      maxNights,
      guestsIncluded,
      pricePerGuest,
      numberOfGuests,
      datesUnavail
    };
    rooms.push(newRoom);
  };
  roomsCollection.insertMany(rooms);
  console.log('Database Seeded!');
})


