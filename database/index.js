const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rooms');

let roomSchema = mongoose.Schema ({
	roomId: { type: Number, unique: true },
	nightlyPrice: Number,
	weeklyPrice: Number,
	monthlyPrice: Number,
	avgRating: Number,
	ratingNum: Number,
	cleaningFee: Number,
	serviceBase: Number,
	taxesBase: Number,
	minNights: Number,
	maxNights: Number,
	guestsIncluded: Number,
	pricePerGuest: Number,
	numberOfGuests: Number,
	datesUnavail: []
});

let Room = mongoose.model('Room', roomSchema);

module.exports = Room;
