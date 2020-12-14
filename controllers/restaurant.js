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
	const restaurants = await Restaurant.insertMany(seedData);
	res.json({
		status: 200,
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

	 //Searching to see if restaurant is already in database
	const foundRest = await Restaurant.find({["name"]:[req.params.rest], ["zipcode"]:[req.params.zip]});
	  console.log("looking at the foundRest variable", foundRest)
	//checking if restaurant was found
  	if (foundRest[0]) {
	//if found send back restaurant as json
		console.log("in the if statement")
		res.json({
		status: 200,
		restaurantsFoundInDb: foundRest,
	})
  	} else {
	//if not found search yelp api for restaurant and create new one in database
	const api_url = `https://api.yelp.com/v3/businesses/search?location=${zip}&term=${rest}`
	const fetch_response = await fetch(api_url, {
		method: "GET",
		headers: {
		Authorization: `Bearer ${API_KEY}`,
	}
	})
	const json = await fetch_response.json()

	// for receieving only 1 restaurant
		// const newRest = { 
		//   	name: json.businesses[0].name,
		// 	zipcode: json.businesses[0].location.zip_code,
		// 	img: json.businesses[0].image_url,
		// }
		// console.log(json)
	
	let newRestaurants = []
	const data = json.businesses
	for (let i = 0; i < data.length; i += 1) {
		newRestaurants.push({...data,
			name: data[i].name,
			zipcode: data[i].location.zip_code,
			img: data[i].image_url,
		})
		// console.log(newRestaurants)
	}

	// ** testing out how we can check the data recieved from the yelp api to see if the restaurants already exisit in db
	// not currently working 
	let verifiedNewRestaurants = []
	for (let i = 0; i < newRestaurants.length; i += 1) { 

		if (await Restaurant.find({["name"]:[newRestaurants[i]["name"]], ["zipcode"]:[newRestaurants[i]["zipcode"]]})) {
				
		} else {
			verifiedNewRestaurants.push(newRestaurants[i])
		}
	}
	//   console.log("the actual new restaurants", verifiedNewRestaurants)

			// add restaurant into database
			const restCreated = await Restaurant.insertMany(verifiedNewRestaurants);
			res.json({
				status: 200,
				restaurantsAddedToDb: restCreated,
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
