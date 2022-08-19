const { user, thought, reaction } = require("../models");

module.exports = {
  async allUsers(req, res) {
    try {
      const users = await User.find()
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Error allUsers", err });
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json({ message: "Error newUser", err });
    }
  },

  async singleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });
      if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error singleUser", err });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json(`Can't find User`);
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: "Error updateUser", err });
    }
  },

  delUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  async addFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { friends: req.params.friendId } }
      );
      if (!updatedUser) {
        return res.status(404).json(`Can't find User`);
      }
      const updatedFriend = await User.findByIdAndUpdate(
        { _id: req.params.friendId },
        { $push: { friends: req.params.id } }
      );
      if (!updatedFriend) {
        return res.status(404).json(`Can't find Friend`);
      }
      res.status(200).json("Friend Added");
    } catch (err) {
      res.status(500).json({ message: "Error addFriend", err });
    }
  },

  async delFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } }
      );
      if (!updatedUser) {
        return res.status(404).json(`Can't find User`);
      }
      const updatedFriend = await User.findByIdAndUpdate(req.params.friendId, {
        $pull: { friends: req.params.id },
      });
      if (!updatedFriend || !updatedUser) {
        return res.status(404).json(`Can't find Friend`);
      }
      res.status(200).json("Friend Deleted");
    } catch (err) {
      res.status(500).json({ message: "Error delFriend", err });
    }
  },
};
