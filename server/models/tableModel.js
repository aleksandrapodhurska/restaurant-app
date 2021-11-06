const mongoose = require("mongoose");

const Table = mongoose.Schema({
	seats: { type: Number, required: true },
	occupied: { type: Boolean, required: true },
	booking: {
		booked: { type: Boolean, default: false },
		seatsBooked: { type: Number, default: null },
		date: { type: Date, default: new Date() },
	},
	bill: { type: mongoose.Types.ObjectId, ref: "Bill", default: null },
});

module.exports = mongoose.model("Table", Table);
