const { Schema, model } = require("mongoose");
const dateFormat = require("../util/format-date");
const reactionSchema = require("../models/Reaction");

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			// must be between 1 & 280 characters
			minlength: 1,
			maxlength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			// use a getter method to format the timestamp on query
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
		// the user that created this thought
		username: {
			type: String,
			required: true,
		},
		// these are like replies
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
	}
);

ThoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model("Thought", ThoughtSchema);

// export the Thought model
module.exports = Thought;
