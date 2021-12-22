const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			// Must match a valid email address (look into Mongoose's matching validation)
			match: [/.+\@.+\..+/, "Invalid Email"],
		},
		thoughts: [
			{
				// type is an ObjectId
				type: Schema.Types.ObjectId,
				// reference the Thought model
				ref: "Thought",
			},
		],
		friends: [
			// Array of '_id' values referencing the User model (self-reference)
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

UserSchema.virtual("friendCount").get(function () {
	// use this because we're creating instances
	return this.friends.length;
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
