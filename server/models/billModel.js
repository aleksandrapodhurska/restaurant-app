import mongoose from "mongoose";

const Bill = mongoose.Schema({
	owner: { type: mongoose.Types.ObjectId, ref: "Table" },
	items: [{ type: mongoose.Types.ObjectId, ref: "MenuItem" }],
	isOpen: { type: Boolean, default: true },
});

export default mongoose.model("Bill", Bill);
