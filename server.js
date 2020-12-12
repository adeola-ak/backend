require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const fetch = require('node-fetch');

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const restaurantRouter = require("./controllers/restaurant");
const itemRouter = require("./controllers/item");
const ratingRouter = require("./controllers/rating");
const yelpRouter = require("./controllers/yelp");

app.get("/", (req, res) => {
	res.send("well, hello there world..");
});




//This is for search..display 5 local resturants on the home page

// const displayLocal = () => {
// axios({
// 	url: `https://api.yelp.com/v3/businesses/search?location=NewYork&term=restaurants`,
// 	method: "GET",
// 	headers: {
// 		Authorization: `Bearer ${API_KEY}`,
// 	},
// }).then((response) => {
// 	console.log(response.data);
// });
// };

//when a restaurant name is searched... the page is redirected, to "searched restaurant" this should display the corresponding restaurant from the search, and the restaurant details....

// axios({
// 	url: `https://api.yelp.com/v3/businesses/${IDHERE}`,
// 	method: "GET",
// 	headers: {
// 		Authorization: `Bearer ${API_KEY}`,
// 	},
// }).then((response) => {
// 	console.log(response);
// });

// //this is for the item list page... this should display reviews on the selected restaurant
// axios({
// 	url: `https://api.yelp.com/v3/businesses/${IDHERE}/reviews`,
// 	method: "GET",
// 	headers: {
// 		Authorization: `Bearer ${API_KEY}`,
// 	},
// }).then((response) => {
// 	console.log(response);
// });

app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/restaurants", restaurantRouter);
app.use("/items", itemRouter);
app.use("/ratings", ratingRouter);
app.use("/yelp", yelpRouter);


// need to install fetch for node "npm install node-fetch"
// route parameters to endpoint "/data/:zip/:rest"
	// const zip = req.params.zip
	//const rest = req.params.rest
// Auth in fetch 

app.get('/data/:zip/:rest', async (req, res) => {
	const zip = req.params.zip
	const rest = req.params.rest
	const api_url = `https://api.yelp.com/v3/businesses/search?location=${zip}&term=${rest}`
	const fetch_response = await fetch(api_url, {
		method: "GET",
		headers: {
		Authorization: `Bearer ${API_KEY}`,
	}
	})
	const json = await fetch_response.json()
	res.json(json)
})

app.listen(PORT, () => {
	console.log(`listening in on port: ${PORT}`);
});
