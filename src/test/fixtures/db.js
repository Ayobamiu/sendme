const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Stock = require("../../models/stock.model");
const User = require("../../models/users.model");

const userOneID = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneID,
  email: "user@one.com",
  password: "userOne!!",
  name: "user One",
  tokens: [
    {
      token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET),
    },
  ],
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Stock.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneID,
  userOne,
  setUpDatabase,
};
