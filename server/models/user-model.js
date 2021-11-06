const mongoose = require("mongoose");

const User = mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: false },
	password: { type: String, required: true },
	role: { type: String, default: "user" },
	isActive: { type: Boolean, default: false },
	activationLink: { type: String },
});

module.exports = mongoose.model("User", User);
