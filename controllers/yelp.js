const {Router} = require("express");
const router = Router();
const API_KEY = process.env.API_KEY;
const fetch = require('node-fetch');
// const axios = require("axios");


// need to install fetch for node "npm install node-fetch" and require in file const fetch = require('node-fetch');
// route parameters to endpoint "/data/:zip/:rest"
	// const zip = req.params.zip
	//const rest = req.params.rest
router.get('/data/:zip/:rest', async (req, res) => {
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



module.exports = router;



// Code we tried earlier
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