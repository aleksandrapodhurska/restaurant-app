const Router = require("express");
const BillController = require("../controllers/billController");

const billRouter = Router();
billRouter.get("/bills", BillController.getAll);
// billRouter.get("/bills/:id", BillController.getBill);

module.exports = billRouter;
