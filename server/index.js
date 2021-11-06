require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const tablesRouter = require("./routers/tablesRouter");
const menuRouter = require("./routers/menuRouter");
const billRouter = require("./routers/billRouter");
const router = require("./routers/authRouter");
const errorMiddleware = require("./middlewares/error-middleware");
const authMiddleware = require("./middlewares/auth-middleware");

const PORT = process.env.PORT || 7000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CLIENT_URL, // who will send us requests - fetch
		credentials: true, // I am ready to receive cookies
	})
);
app.use("/auth", router);
app.use("/", authMiddleware, tablesRouter);
app.use("/", authMiddleware, menuRouter);
app.use("/", authMiddleware, billRouter);
app.use(errorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
