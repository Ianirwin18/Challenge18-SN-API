const { User, Thought, Reaction } = require("../models");

module.exports = {
  async allReactions(req, res) {
    try {
      const reactions = await Reaction.find();
      res.status(200).json(reactions);
    } catch (err) {
      res.status(500).json({ message: "allThoughts Error", err });
    }
  },

  async singleReaction(req, res) {
    try {
      const reaction = await reaction.findOne({ id_: req.params.reactionId });
      if (!reaction) {
        return res.status(404).json("Reaction not found");
      }
      res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json({ message: "singleReaction Error", err });
    }
  },
};
