import Table from "../models/tableModel.js";

class TablesController {
	async getAll(req, res) {
		try {
			const tables = await Table.find();
			return res.json(tables);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
	async getOne(req, res) {
		try {
			let { id } = req.params;
			if (!id) {
				res.status(400).json("Id not found");
			} else {
				const table = await Table.findById(id);
				return res.json(table);
			}
		} catch (error) {
			return res.status(500).json(error);
		}
	}
	async toggleOccupied(req, res) {
		try {
			const { table } = req.body;
			if (!table._id) {
				res.status(400).json("Id not found");
			} else {
				const updatedTable = await Table.findByIdAndUpdate(
					table._id,
					table,
					{ new: true }
				);
				return res.json(updatedTable);
			}
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

export default new TablesController();
