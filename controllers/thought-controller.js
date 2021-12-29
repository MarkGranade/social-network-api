const { Thought, User } = require("../models");
const { db } = require("../models/User");

const thoughtController = {
	// Get all thoughts
	getAllThoughts(req, res) {
		Thought.find({})
			.select("-__v")
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(404).json(err);
			});
	},

	// Get one Thought by _id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// create new Thought (and push the Thought's <_id> to the associated user's [thoughts] array)
	// expects: {"thoughtText": "Test thought text", "username": "Bobby", "userId": "61ccaee29374031abe225e37"}
	createThought({ body }, res) {
		Thought.create(body)
			.then((dbThoughtData) => {
				// console.log(dbThoughtData);
				return User.findOneAndUpdate(
					{ _id: body.userId },
					{
						$push: {
							thoughts: dbThoughtData._id,
						},
					},
					{ new: true }
				);
			})
			.then((updatedUser) => {
				console.log("hello");
				if (!updatedUser) {
					return res
						.status(404)
						.json({ message: "No user found with this id!" });
				}
				res.json(updatedUser);
			})
			.catch((err) => res.status(400).json(err));
	},

	// Update thought by _id
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// Delete thought by _id
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// Create reaction === /api/thoughts/:thoughtId/reactions
	// expects: {"reactionBody": "That is a cool thought!", "username": "Bobby"}
	createReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{
				_id: params.thoughtId,
			},
			{
				$push: {
					reactions: body,
				},
			},
			{
				new: true,
			}
		)
			.then((updatedThought) => res.json(updatedThought))
			.catch((err) => res.status(400).json(err));
	},

	// Delete reaction === /api/thoughts/:thoughtId/reactions/:reactionId
	deleteReaction({ params }, res) {
		console.log(params);
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{
				$pull: {
					reactions: {
						reactionId: params.reactionId,
					},
				},
			},
			{ new: true }
		)
			.then((dbThoughtData) => {
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},
};

module.exports = thoughtController;
