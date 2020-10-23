const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	img: String,
	ratings: [{ ref: "Rating", type: Schema.Types.ObjectId }],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
