const JWT_SECRET = require("../config/config").JWT_SECRET;
const jwt = require("../lib/jsonwebtoken");

exports.auth = async (req, res, next) => {
  const token = req.cookies.auth;
  if (!token) {
    return next();
  }
  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    res.locals.user = decoded;
    res.locals.isAuthenticated = true;
    next();
  } catch (error) {
    res.clearCookie("auth");
    res.redirect("/auth/login");
  }
};

exports.isGuest = (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

exports.isUser = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};
