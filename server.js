require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const restaurantRouter = require("./controllers/restaurant");
const itemRouter = require("./controllers/item");
const ratingRouter = require("./controllers/rating");


app.get("/", (req, res) => {
	res.send("well, hello there world..");
});

app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/restaurants", restaurantRouter);
app.use("/items", itemRouter);
app.use("/ratings", ratingRouter);


app.listen(PORT, () => {
	console.log(`listening in on port: ${PORT}`);
});
