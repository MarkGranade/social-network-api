const mongoose = require("mongoose");
const User = require("../models/User");
const Thought = require("../models/Thought");
const Reaction = require("../models/Reaction");

mongoose
	.connect("mongodb://localhost:27017/social-network", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log(err);
	});

const seedUsers = [
	// {
	// 	username: "Granade",
	// 	email: "mark.granade@gmail.com",
	// 	thoughts: [],
	// 	friends: [],
	// },
	// {
	// 	username: "AlPal",
	// 	email: "alpal@gmail.com",
	// 	thoughts: [],
	// 	friends: [],
	// },
];

const seedThoughts = [
	// {
	// 	thoughtText: "Here is a cool thought...",
	// 	username: "Granade",
	// },
	// {
	// 	thoughtText: "Thoughts are the words of our minds!",
	// 	username: "AlPal",
	// },
];

const seedDB = async () => {
	await User.deleteMany({});
	await Thought.deleteMany({});

	await Thought.insertMany(seedThoughts);
	await User.insertMany(seedUsers);
};

seedDB().then(() => {
	mongoose.connection.close();
});
