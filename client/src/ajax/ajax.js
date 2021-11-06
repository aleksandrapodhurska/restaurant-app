import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000/",
	withCredentials: true,
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.token}`;
	return config;
});

instance.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.res.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._sRetry = true;
			try {
				const originalRequest = error.config;
				const data = instance.get("auth/refresh", {
					withCredentials: true,
				});
				const res = data.json();
				localStorage.token = res.accessToken;
				return instance.request(originalRequest);
			} catch (error) {
				console.log("User unathorized");
			}
		}
		throw error;
	}
);

const dataBase = {
	logIn({ email, password }) {
		return instance.post("auth/login", { email, password }).then((res) => {
			console.log(res.data);
			return res.data;
		});
	},
	signUp({ email, password }) {
		return instance
			.post("auth/registration", { email, password })
			.then((res) => {
				return res.data;
			});
	},
	logout() {
		return instance.post("auth/logout").then((res) => {
			return res.data;
		});
	},
	checkAuth() {
		return instance
			.get("auth/refresh", { withCredentials: true })
			.then((res) => {
				return res.data;
			});
	},
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
