const mongoose = require("mongoose");

const MenuItem = mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	category: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: false },
});

module.exports = mongoose.model("MenuItem", MenuItem);
