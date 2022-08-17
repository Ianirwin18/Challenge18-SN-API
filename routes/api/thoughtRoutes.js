const router = require("express").Router();
const { thought, reaction } = require("../../models");

// Controller
const {
  allThoughts,
  createThought,
  singleThought,
  updateThought,
  delThought,
  addReaction,
  delReaction,
  singleReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(allThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(singleThought)
  .delete(delThought)
  .put(updateThought)
  .put();

router.route("/:thoughtId/reactions").post(addReaction);

router
  .route("/:thoughtId/reactions/:reactionId")
  .get(singleReaction)
  .delete(delReaction);

module.exports = router;
