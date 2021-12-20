const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema({
	thoughtText: {
		type: String,
		// required
		// must be between 1 & 280 characters
	},
	createdAt: {
		type: Date,
		default: Date.now,
		// use a getter method to format the timestamp on query
	},
	// the user that created this thought
	username: {
		type: String,
		// required
	},
	// these are like replies
	reactions: [
		// Array of nested documents created with the "reactionSchema"
	],
});

// create the Thought model using the ThoughtSchema
const Thought = model("Thought", ThoughtSchema);

// export the Thought model
module.exports = Thought;
