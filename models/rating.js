const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
	name: { type: String, required: true },
	date: Date,
	stars: { type: Number, required: true },
	comment: { type: String },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
