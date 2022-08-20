const { User, Thought, Reaction } = require("../models");

module.exports = {
  async allThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json({ message: "Error allThoughts", err });
    }
  },

  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { username: newThought.username },
        { $push: { thoughts: newThought._id } }
      );
      res.status(200).json(newThought);
    } catch (err) {
      res.status(500).json({ message: "Error createThought", err });
    }
  },

  async singleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json("Thought missing");
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json({ message: "Error singleThought", err });
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }
      );
      if (!updatedThought) {
        return res.status(404).json("Thought missing");
      }
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(500).json({ message: "Error updateThought", err });
    }
  },

  async delThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!deleteThought) {
        return res.status(404).json("Thought missing");
      }
      res.status(200).json(deleteThought);
    } catch (err) {
      res.status(500).json({ message: "Error delThought", err });
    }
  },

  async addReaction(req, res) {
    try {
      const newReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!newReaction) {
        return res.status(404).json("Thought missing");
      }
      res.status(200).json(newReaction);
    } catch (err) {
      res.status(500).json({ message: "Error addReaction", err });
    }
  },

  async singleReaction(req, res) {
    try {
      const reaction = await Reaction.findOne({ _id: req.params.reactionId });
      if (!reaction) {
        return res.status(404).json("Reaction mising");
      }
      res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json({ message: "Error singleReaction", err });
    }
  },

  async delReaction(req, res) {
    try {
      const deleteReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      if (!deleteReaction) {
        return res.status(404).json("Reaction missing");
      }
      res.status(200).json("Reaction Deleted");
    } catch (err) {
      res.status(500).json({ message: "Error delReaction", err });
    }
  },
};
