const { Router } = require("express");
const router = Router();
const mongoose = require("../db/connection");
const seedData = require("../db/itemSeed.json");
const Restaurant = require("../models/restaurant");
const Rating = require("../models/rating");
const Item = require("../models/item");

//get all items and seed
router.get("/seed", async (req, res) => {
	await Item.deleteMany({});
	const items = await Item.insertMany(seedData);
	res.json({
		status: 200,
		items: items,
	});
});

//get all items
router.get("/", async (req, res) => {
	const items = await Item.find({}).populate("ratings");
	res.json({
		status: 200,
		items: items,
	});
});

//get specific item by id
router.get("/:id", async (req, res) => {
	const item = await Item.findById(req.params.id);
	res.json({
		status: 200,
		items: item,
	});
});

//post an item
router.post("/", async (req, res) => {
	const item = await Item.create(req.body);
	res.json({
		status: 200,
		items: item,
	});
});

//update an item
router.put("/:id", async (req, res) => {
	const item = await Item.findByIdAndUpdate(req.params.id, req.body);
	res.json({
		status: 200,
		items: item,
	});
});

// get items and associated rating
router.put("/:itemId/addRating/:ratingId", async (req, res) => {
	const rating = await Rating.findById(req.params.ratingId, (err, rating) => {
		if (err) console.log(err);
		else {
			console.log("rating.id", rating._id);
			Item.findByIdAndUpdate(
				req.params.itemId,
				{
					$push: {
						ratings: rating._id,
					},
				},
				(err, item) => {
					if (err) console.log(err);
					else
						res.json({
							status: 200,
							items: item,
						});
				}
			);
		}
	});
});

//delete an item
router.delete("/:id", async (req, res) => {
	const item = await Item.findByIdAndRemove(req.params.id);
	res.json({
		status: 200,
		items: item,
	});
});

module.exports = router;
