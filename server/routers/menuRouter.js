const Router = require("express");
const MenuController = require("../controllers/menuController");

const menuRouter = Router();
menuRouter.get("/menu", MenuController.getAll);
menuRouter.get("/menu/categories", MenuController.getCategories);
menuRouter.get("/menu/:id", MenuController.getOne);
menuRouter.get("/menu/categories/:category", MenuController.getByCategory);
// menuRouter.post("/menu", BillController.createNewBill);

module.exports = menuRouter;
