import Router from "express";
import BillController from "../controllers/billController.js";

const billRouter = Router();
billRouter.get("/bills", BillController.getAll);
// billRouter.get("/bills/:id", BillController.getBill);

export default billRouter;
