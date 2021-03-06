const Bill = require("../models/billModel");

class BillController {
	async createNewBill(req, res) {
		try {
			const newBill = await Bill.create({
				owner: req.body.tableId,
				items: [req.body.menuItem],
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
	async updateBill(req, res) {
		try {
			const { tableId, order } = req.body;
			console.log(tableId, order);
			const bill = await Bill.findOneAndUpdate(
				{ owner: tableId },
				{
					items: order,
				},
				{ new: true }
			);
			console.log(bill);
			return res.status(201).json(bill);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

module.exports = new BillController();
