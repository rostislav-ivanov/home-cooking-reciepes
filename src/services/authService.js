const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

exports.register = async (userData) => {
  if (userData.password !== userData.rePassword) {
    throw new Error("Passwords do not match");
  }

  const user = await User.findOne({ email: userData.email.toLowerCase() });
  if (user) {
    throw new Error("Email is already taken");
  }

  const createdUser = User(userData);
  await createdUser.save();

  const token = await generateToken(createdUser);

  return token;
};

exports.login = async (userData) => {
  const user = await User.findOne({ email: userData.email.toLowerCase() });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return generateToken(user);
};
