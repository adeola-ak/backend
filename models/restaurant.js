const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
	name: { type: String, required: true },
	// address: {type: String },
	zipcode: { type: String, required: true },
	img: String,
	items: [{ ref: "Item", type: Schema.Types.ObjectId }],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
