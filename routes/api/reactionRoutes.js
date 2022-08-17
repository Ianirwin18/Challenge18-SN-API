const router = require("express").Router();
const { user, thought, reaction } = require("../../models");

const {
  allReactions,
  singleReaction,
} = require("../../controllers/reactionController");

router.route("/").get(allReactions);

router.route("/:reactionId").get(singleReaction);

module.exports = router;
