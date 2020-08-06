const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let roomSchema = mongoose.Schema ({
	roomId: { type: Number, unique: true }
	basePrice: Number,
	avgRating: Number,
	ratingNum: Number,
	cleaningFee: Number,
	serviceBase: Number,
	taxesBase: Number,
	pricePerGuest: Number,
	url: { type: String, unique: true },
	datesArray: []
});

let Room = mongoose.model('Room', roomSchema);

module.exports.Room = Room;
