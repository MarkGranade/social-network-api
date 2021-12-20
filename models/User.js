const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	username: {
		type: String,
		// unique
		// required
		// trimmed
	},
	email: {
		type: String,
		// required
		// unique
		// Must match a valid email address (look into Mongoose's matching validation)
	},
	thoughts: [],
	friends: [
		// Array of '_id' values referencing the User model (self-reference)
	],
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
