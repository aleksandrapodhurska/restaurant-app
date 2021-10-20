import MenuItem from "../models/menuModel.js";

class MenuController {
	async getAll(req, res) {
		try {
			const menu = await MenuItem.find();
			return res.json(menu);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
	async getOne(req, res) {
		try {
			const { id } = req.params;
			// console.log(id + "from menu controller");
			const menuItem = await MenuItem.findById(id);
			return res.json(menuItem);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
	async getCategories(req, res) {
		try {
			const menu = await MenuItem.find();
			const categories = [...new Set(menu.map((item) => item.category))];
			return res.json(categories);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
	async getByCategory(req, res) {
		try {
			const { category } = req.params;
			const menu = await MenuItem.find();
			const menuByCategory = menu.filter(
				(item) => item.category === category
			);
			return res.json(menuByCategory);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}

export default new MenuController();

// async getCategories(req, res) {
// 	try {
// 	} catch (error) {
// 		return res.status(500).json(error);
// 	}
// }
// async getByCategory(req, res) {
// 	try {
// 		let { cat } = req.params;
// 		console.log(cat);
// 		if (!cat) {
// 			res.status(400).json("Category is not specified");
// 		}
// 		const menuByCategory = await MenuItem.find({
// 			category: cat,
// 		}).exec();
// 		console.log(menuByCategory);
// 		return res.json(menuByCategory);
// 	} catch (error) {
// 		return res.status(500).json(error);
// 	}
// }
