require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT;

app.get("/", (req, res) => {
	res.send("well hello there world..");
});

app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
	console.log(`listening in on port: ${PORT}`);
});
