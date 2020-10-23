const { Router } = require("express");
const router = Router();
const mongoose = require("../db/connection");
const seedData = require("../db/rateSeed.json");
const Restaurant = require("../models/restaurant");
const Rating = require("../models/rating");
const Item = require("../models/item");

//get all ratings
router.get("/seed", async (req, res) => {
	await Rating.deleteMany({});
	const ratings = await Rating.insertMany(seedData);
	res.json({
		status: 200,
		ratings: ratings,
	});
});

//
router.get("/", async (req, res) => {
	const rating = await Rating.find({});
	res.json({
		status: 200,
		rating: rating,
	});
});

//get specific rating by rating id
router.get("/:id", async (req, res) => {
	const rating = await Rating.findById(req.params.id);
	res.json({
		status: 200,
		rating: rating,
	});
});

//post an rating
router.post("/", async (req, res) => {
	const rating = await Rating.create(req.body);
	res.json({
		status: 200,
		rating: rating,
	});
});

//update a rating
router.put("/:id", async (req, res) => {
	const rating = await Rating.findByIdAndUpdate(req.params.id, req.body);
	res.json({
		status: 200,
		rating: rating,
	});
});

//delete a rating
router.delete("/:id", async (req, res) => {
	const rating = await Rating.findByIdAndRemove(req.params.id);
	res.json({
		status: 200,
		rating: rating,
	});
});

module.exports = router;
