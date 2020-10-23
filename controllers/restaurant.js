const { Router } = require("express");
const router = Router();
const mongoose = require("../db/connection");
const seedData = require("../db/resSeed.json");
const Restaurant = require("../models/restaurant");
const Rating = require("../models/rating");
const Item = require("../models/item");

//get all restaurants and seed
router.get("/seed", async (req, res) => {
	await Restaurant.deleteMany({});
	const restuarants = await Restaurant.insertMany(seedData);
	res.json({
		status: 200,
		restuarants: restuarants,
	});
});

//get all restaurants
router.get("/", async (req, res) => {
	const restuarants = await Restaurant.find({}).populate("items");
	res.json({
		status: 200,
		restuarants: restuarants,
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
							restuarants: restaurant,
						});
				}
			);
		}
	});
});

//get specific restaurant by id
router.get("/:id", async (req, res) => {
	const restuarant = await Restaurant.findById(req.params.id);
	res.json({
		status: 200,
		restuarants: restuarant,
	});
});

module.exports = router;
