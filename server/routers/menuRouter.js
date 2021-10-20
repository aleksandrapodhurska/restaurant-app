import Router from "express";
import MenuController from "../controllers/menuController.js";
import BillController from "../controllers/billController.js";

const menuRouter = Router();
menuRouter.get("/menu", MenuController.getAll);
menuRouter.get("/menu/categories", MenuController.getCategories);
menuRouter.get("/menu/:id", MenuController.getOne);
menuRouter.get("/menu/categories/:category", MenuController.getByCategory);
// menuRouter.post("/menu", BillController.createNewBill);

export default menuRouter;
