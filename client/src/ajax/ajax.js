import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000/",
	// withCredentials: true,
	"Access-Control-Allow-Origin": "*",
});

const dataBase = {
	getTables() {
		return instance.get("tables").then((res) => {
			return res.data;
		});
	},
	getSingleTable(id) {
		return instance.get(`tables/${id}`).then((res) => {
			return res.data;
		});
	},
	toggleOcupied(table) {
		return instance.put(`tables/${table._id}`, { table }).then((res) => {
			return res.data;
		});
	},
	getMenu() {
		return instance.get("menu").then((res) => {
			return res.data;
		});
	},
	getBill(tableId) {
		return instance.get(`tables/${tableId}/bill`).then((res) => {
			if (res.data.some((bill) => bill.isOpen)) {
				return res.data.find((bill) => bill.isOpen);
			} else return [];
			// return res.data;
		});
	},
	getMenuItem(menuItemId) {
		return instance.get(`menu/${menuItemId}`).then((res) => {
			return res.data;
		});
	},
	openBill(tableId, menuItem) {
		return instance
			.post(`tables/${tableId}/bill`, { tableId, menuItem })
			.then((res) => {
				return res.data;
			});
	},
	// closeBill(tableId, menuItemId) {
	// 	return instance
	// 		.put(`tables/${tableId}/bill`, { tableId })
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			return res.data;
	// 		});
	// },
	// updateBill(tableId, menuItemId) {
	// 	return instance
	// 		.put(`menu`, { tableId, menuItemId })
	// 		.then((res) => console.log(res));
	// },
	getCategories() {
		return instance.get("/menu/categories").then((res) => {
			return res.data;
		});
	},
	getByCategory(category) {
		category = category.replace(/\s/g, "%20");
		return instance.get(`/menu/categories/${category}`).then((res) => {
			return res.data;
		});
	},
	confirmOrder(tableId, order) {
		return instance
			.put(`tables/${tableId}/bill`, { tableId, order })
			.then((res) => {
				return res.data;
			});
	},
};

export default dataBase;
