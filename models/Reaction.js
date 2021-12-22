const { Schema, Types } = require("mongoose");
const dateFormat = require("../util/format-date");

const ReactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		maxlength: 280,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return dateFormat(date);
		},
	},
});

module.exports = ReactionSchema;
