const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	rating: Number, //do we need to specify a range here?
	url: String,
	comments: [{ ref: "Comment", type: Schema.Types.ObjectId }],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
