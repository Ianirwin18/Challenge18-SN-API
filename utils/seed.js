const connection = require("../config/connection");
const { user, thought } = require("../models");

// USER SEED DATA
const userSeed = [
  {
    username: "userOne",
    email: "userOne@gmail.com",
  },
  {
    username: "userTwo",
    email: "userTwo@gmail.com",
  },
  {
    username: "userThree",
    email: "userThree@gmail.com",
  },
  {
    username: "userFour",
    email: "userFour@gmail.com",
  },
];

connection.once("open", async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});
  await User.collection.insertMany(userSeed);

  console.log("Users seeded!");
  console.info(" Seeding complete!");
  console.table(userSeed);
  process.exit(0);
});
