import mongoose from "mongoose";

const MenuItem = mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	category: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: false },
});

export default mongoose.model("MenuItem", MenuItem);
