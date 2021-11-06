const mongoose = require("mongoose");

const Bill = mongoose.Schema({
	owner: { type: mongoose.Types.ObjectId, ref: "Table" },
	items: [
		{
			name: { type: String, required: true },
			category: { type: String, required: true },
			price: { type: Number, required: true },
			quantity: { type: Number, required: true },
			total: { type: Number },
		},
	],
	isOpen: { type: Boolean, default: true },
});

module.exports = mongoose.model("Bill", Bill);
// import mongoose from "mongoose";

// const Bill = mongoose.Schema({
// 	owner: { type: mongoose.Types.ObjectId, ref: "Table" },
// 	items: [
// 		{
// 			menuItem: { type: mongoose.Types.ObjectId, ref: "MenuItem" },
// 			quantity: { type: Number },
// 		},
// 	],
// 	isOpen: { type: Boolean, default: true },
// });

// export default mongoose.model("Bill", Bill);
