const { User } = require("../models");

const userController = {
	// Get all users
	getAllUser(req, res) {
		User.find({})
			.populate({
				path: "friends",
				// select: "-__v",
				select: "-__v -thoughts -email",
			})
			.select("-__v")
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(404).json(err);
			});
	},

	// Get one user by _id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id! " });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// createUser: expects {"username": "Bobby", "email": "testing@gmail.com"}
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},

	// update user by _id
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// delete user
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// Add friend === /api/users/:userId/friends/:friendId
	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{
				$addToSet: {
					friends: params.friendId,
				},
			},
			{ new: true }
		)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},

	// Delete friend === /api/users/:userId/friends/:friendId
	deleteFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{
				$pull: {
					friends: params.friendId,
				},
			},
			{ new: true }
		)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},
};

module.exports = userController;
