const jwt = require("../lib/jsonwebtoken");
const JWT_SECRET = require("../config/config").JWT_SECRET;

exports.generateToken = async (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  return await jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};
