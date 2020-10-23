const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
	name: { type: String, required: true },
	zipcode: { type: String, required: true },
	url: String,
	items: [{ ref: "Item", type: Schema.Types.ObjectId }],
	comments: [{ ref: "Comment", type: Schema.Types.ObjectId }],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
