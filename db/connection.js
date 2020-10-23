require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/project3";

const config = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false,
};

//create the connection
mongoose.connect(mongoURI, config);

//db connection events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () =>
	console.log("mongo is connected to database:", mongoURI)
);
db.on("disconnected", () => console.log("mongo disconnected"));

module.exports = mongoose;
