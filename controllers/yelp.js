const { Router } = require("express");
const router = Router();
const API_KEY = process.env.apikey;
const axios = require("axios");

router.get("/data", async (req, res, next) => {
	await axios({
		url: `https://api.yelp.com/v3/businesses/search?location=NewYork&term=restaurants`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${API_KEY}`,
		},
	}).then((response) => {
		res.json({
			status: 200,
			yelp: response.data,
		});
	});
});

module.exports = router;
