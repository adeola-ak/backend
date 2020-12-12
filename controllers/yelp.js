const { Router, response } = require("express");
const router = Router();
const API_KEY = process.env.apikey;
const axios = require("axios");

// router.post("/data", async (req, res) => {
// 	const rest = req.body.restaurant;
// 	const zip = req.body.zipcode;
// 	try {
// 	await axios({
// 		url: `https://api.yelp.com/v3/businesses/search?location=${zip}&term=${rest}`,
// 		method: "GET",
// 		headers: {
// 			Authorization: `Bearer ${API_KEY}`,
// 		},
// 	})
// 	.then((response) => {
// 		res.json({
// 			status: 200,
// 			yelp: response.data,
// 		});
// 	})
// 	} catch(err) {
// 		res.json({
// 			status: 404
// 		})
// 	}
	

// });



module.exports = router;
