const { user, thought, reaction } = require("../models");

module.exports = {
  // ALL THOUGHTS + INCLUDE FRIENDS
  async allThoughts(req, res) {
    try {
      const thoughts = await thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json({ message: "Error allThoughts", err });
    }
  },

  // CREATE THOUGHT
  async createThought(req, res) {
    try {
      const newThought = await thought.create(req.body);
      await User.findOneAndUpdate(
        { username: newThought.username },
        { $push: { thoughts: newThought._id } }
      );
      res.status(200).json(newThought);
    } catch (err) {
      res.status(500).json({ message: "Error createThought", err });
    }
  },

  // SINGLE THOUGHT
  async singleThought(req, res) {
    try {
      const thought = await thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json("Thought missing");
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json({ message: "Error singleThought", err });
    }
  },

  // UPDATE THOUGHT
  async updateThought(req, res) {
    try {
      const updatedThought = await thought.findOneAndUpdate(
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
      const deleteThought = await thought.findOneAndDelete({
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

  // ADD REACTION
  async addReaction(req, res) {
    try {
      const newReaction = await thought.findOneAndUpdate(
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

  // SINGLE REACTION
  async singleReaction(req, res) {
    try {
      const reaction = await reaction.findOne({ _id: req.params.reactionId });
      if (!reaction) {
        return res.status(404).json("Reaction mising");
      }
      res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json({ message: "Error singleReaction", err });
    }
  },

  // DELETE REACTION
  async delReaction(req, res) {
    try {
      const deleteReaction = await thought.findOneAndUpdate(
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
