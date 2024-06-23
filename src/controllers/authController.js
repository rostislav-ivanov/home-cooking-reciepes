const router = require("express").Router();
const { isUser, isGuest } = require("../middlewares/authMiddleware");
const authService = require("../services/authService");
const { parseError } = require("../utils/errorUtils");

router.get("/register", isGuest, (req, res) => {
  res.render("auth/register");
});

router.post("/register", isGuest, async (req, res) => {
  const userData = req.body;
  try {
    const token = await authService.register(userData);
    res.cookie("auth", token);
    res.redirect("/");
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("auth/register", { ...userData, errors });
  }
});

router.get("/login", isGuest, (req, res) => {
  res.render("auth/login");
});

router.post("/login", isGuest, async (req, res) => {
  const userData = req.body;
  try {
    const token = await authService.login(userData);
    res.cookie("auth", token);
    res.redirect("/");
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("auth/login", { ...userData, errors });
  }
});

router.get("/logout", isUser, (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
