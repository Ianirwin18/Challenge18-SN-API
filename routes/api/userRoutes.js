const router = require("express").Router();
const { User } = require("../../models");

// Controller
const {
  allUsers,
  createUser,
  singleUser,
  updateUser,
  delUser,
  addFriend,
  delFriend,
} = require("../../controllers/userController");

router.route("/").get(allUsers).post(createUser);
router.route("/:id").get(singleUser).delete(delUser).put(updateUser);
router.route("/:id/friends/:friendId").post(addFriend).delete(delFriend);

module.exports = router;
