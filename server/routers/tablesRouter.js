import Router from "express";
import TablesController from "../controllers/tablesController.js";
import BillController from "../controllers/billController.js";

const tablesRouter = Router();
tablesRouter.get("/tables", TablesController.getAll);
tablesRouter.get("/tables/:id", TablesController.getOne);
tablesRouter.put("/tables/:id", TablesController.toggleOccupied);
tablesRouter.get("/tables/:id/bill", BillController.getBill);
tablesRouter.post("/tables/:id/bill", BillController.createNewBill);
// tablesRouter.post("tables/:id/bill", BillController.addItemToBill);

export default tablesRouter;
