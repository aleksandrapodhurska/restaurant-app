import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tablesRouter from "./routers/tablesRouter.js";
import menuRouter from "./routers/menuRouter.js";
import billRouter from "./routers/billRouter.js";
import Table from "./models/tableModel.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", tablesRouter);
app.use("/", menuRouter);
app.use("/", billRouter);

const PORT = process.env.PORT || 5000;
const DB_URL =
	"mongodb+srv://***REMOVED***@restaurant.ped92.mongodb.net/RestaurantMenu?retryWrites=true&w=majority";

const start = async () => {
	try {
		await mongoose.connect(
			DB_URL,
			{ useNewUrlParser: true },
			{ useUnifiedTopology: true }
			// { useFindAndModify: true },
			// { useCreateIndex: true }
		);
		app.listen(PORT, () =>
			console.log(`Server is working at ${PORT} port`)
		);
	} catch (error) {
		console.log(error.message);
	}
};

start();

app.post("/", async (req, res) => {
	try {
		const {
			seats,
			occupied,
			booking: { booked, seatsBooked, date },
			bill,
		} = req.body;
		console.log(req.body);
		const table = await Table.create({
			seats,
			occupied,
			booking: { booked, seatsBooked, date },
			bill,
		});
		res.status(200).json(table);
	} catch (error) {
		console.log(error);
	}
});
