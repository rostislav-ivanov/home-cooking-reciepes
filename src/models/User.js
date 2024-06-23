const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // TODO: Add the necessary properties for the user model

  username: {
    type: String,
    required: [true, "Please provide a username"],
    minLength: [2, "Username must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true, // Converts email to lowercase
    minLength: [10, "Email must be at least 10 characters long"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [4, "Password must be at least 4 characters long"],
  },
});

userSchema.pre("save", async function (next) {
  // Convert email to lowercase
  this.email = this.email.toLowerCase();

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
