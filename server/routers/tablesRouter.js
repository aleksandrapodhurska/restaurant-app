const Router = require("express");
const BillController = require("../controllers/billController");
const TablesController = require("../controllers/tablesController");

const tablesRouter = Router();
tablesRouter.get("/tables", TablesController.getAll);
tablesRouter.get("/tables/:id", TablesController.getOne);
tablesRouter.put("/tables/:id", TablesController.toggleOccupied);
tablesRouter.get("/tables/:id/bill", BillController.getBill);
tablesRouter.post("/tables/:id/bill", BillController.createNewBill);
tablesRouter.put("/tables/:id/bill", BillController.updateBill);

module.exports = tablesRouter;
