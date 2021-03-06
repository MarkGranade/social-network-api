const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

// tells Mongoose which database we want to connect to.
mongoose.connect(
	// If the environment variable MONGODB_URI exists, it will use that
	process.env.MONGODB_URI || "mongodb://localhost:27017/social-network",
	{
		// configuration options Mongoose asks for more info about
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

// <.once> opens it to give us access to database with the server
mongoose.connection.once("open", () => {
	app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
});
