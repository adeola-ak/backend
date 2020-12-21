const { Router } = require("express");
const router = Router();
const mongoose = require("../db/connection");
const seedData = require("../db/resSeed.json");
const Restaurant = require("../models/restaurant");
const Rating = require("../models/rating");
const Item = require("../models/item");

const API_KEY = process.env.API_KEY;
const fetch = require('node-fetch');

//get all restaurants and seed
router.get("/seed", async (req, res) => {
	await Restaurant.deleteMany({});
	// const restaurants = await Restaurant.insertMany(seedData);
	res.json({
		status: 200,
		msg: "db cleared",
		restaurants: restaurants,
	});
});

//get all restaurants
router.get("/", async (req, res) => {
	const restaurants = await Restaurant.find({}).populate("items");
	res.json({
		status: 200,
		restaurants: restaurants,
	});
});

// get request to yelp api and add to database 
router.get('/data/:zip/:rest', async (req, res) => {
	const zip = req.params.zip
	const rest = req.params.rest

	// Searching to see if restaurant is already in database
	const foundRest = await Restaurant.find({["name"]:[req.params.rest], ["zipcode"]:[req.params.zip]});
	  console.log("looking at the foundRest variable", foundRest)
	// checking if restaurant was found
  	if (foundRest[0]) {
	//if found send back restaurant as json
		console.log("in the if statement")
		res.json({
		status: 200,
		restaurants: foundRest,
	})
  	} else {
	// if not found search yelp api for restaurant and create new one in database
	const api_url = `https://api.yelp.com/v3/businesses/search?location=${zip}&term=${rest}&limit=10`
	const fetch_response = await fetch(api_url, {
		method: "GET",
		headers: {
		Authorization: `Bearer ${API_KEY}`,
	}
	})
	const json = await fetch_response.json()
	
	let newRestaurants = []
	const data = json.businesses
	for (let i = 0; i < data.length; i += 1) {
		newRestaurants.push({...data,
			name: data[i].name,
			address: data[i].location.display_address,
			zipcode: data[i].location.zip_code,
			phone: data[i].display_phone,
			img: data[i].image_url,
		})
	}

	//Checking the data recieved from the yelp api to see if the restaurants already exisit in db
	let verifiedNewRestaurants = []
	for (let i = 0; i < newRestaurants.length; i += 1) { 
		const restaurantTest = await Restaurant.find({["name"]: newRestaurants[i]["name"], ["zipcode"]: newRestaurants[i]["zipcode"]}) 


		if (newRestaurants[i] === restaurantTest) {
			console.log(restaurantTest)
		} else {
			verifiedNewRestaurants.push(newRestaurants[i])
		}
	}

	// add restaurant into database
	const restCreated = await Restaurant.insertMany(verifiedNewRestaurants);
		res.json({
			status: 200,
			restaurants: restCreated,
		})
		
	}		
})

//edit a restaurant
router.put("/:id", async (req, res) => {
	const restaurants = await Restaurant.findByIdAndUpdate("restaurants");
	res.json({
		status: 200,
		restaurants: restaurants,
	});
});

// get restaurants and associated items
router.put("/:restaurantId/addItem/:itemId", async (req, res) => {
	const item = await Item.findById(req.params.itemId, (err, item) => {
		if (err) console.log(err);
		else {
			console.log("item.id", item._id);
			Restaurant.findByIdAndUpdate(
				req.params.restaurantId,
				{
					$push: {
						items: item._id,
					},
				},
				(err, restaurant) => {
					if (err) console.log(err);
					else
						res.json({
							status: 200,
							restaurants: restaurant,
						});
				}
			);
		}
	});
});

//get specific restaurant by id
router.get("/:id", async (req, res) => {
	const restaurant = await Restaurant.findById(req.params.id).populate(
		"items"
	);
	res.json({
		status: 200,
		restaurants: restaurant,
	});
});





module.exports = router;
