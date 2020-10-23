const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	comment: { type: String, required: true },
	items: [{ ref: "Item", type: Schema.Types.ObjectId }],
	restaurant: [{ ref: "Restaurant", type: Schema.Types.ObjectId }],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
