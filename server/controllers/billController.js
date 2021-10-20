import Bill from "../models/billModel.js";

class BillController {
	// async addItemToBill(req, res) {
	// 	console.log(req.body);
	// 	try {
	// 		let { id } = req.params;
	// 		if (!id) {
	// 			res.status(400).json("Id not found");
	// 		} else {
	// 			const bill = await Bill.find({ owner: id }).items;
	// 			console.log(bill);
	// 		}
	// 		// console.log(req.body);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }
	async createNewBill(req, res) {
		try {
			const newBill = await Bill.create({
				owner: req.body.tableId,
				items: req.body.menuItemId,
			});

			res.status(200).json(newBill);
		} catch (error) {
			console.log(error);
		}
	}
	async getAll(req, res) {
		try {
			const bill = await Bill.find();
			return res.json(bill);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
	async getBill(req, res) {
		try {
			let { id } = req.params;
			if (!id) {
				res.status(400).json("Id not found");
			} else {
				const bill = await Bill.find({ owner: id });
				return res.json(bill);
			}
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

export default new BillController();
