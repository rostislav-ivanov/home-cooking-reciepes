const router = require("express").Router();
const { isUser } = require("../middlewares/authMiddleware");
const { parseError } = require("../utils/errorUtils");
const recipeService = require("../services/recipeService");

router.get("/create", isUser, (req, res) => {
  res.render("recipes/create");
});

router.post("/create", isUser, async (req, res) => {
  const recipeData = { ...req.body, owner: req.user._id };
  try {
    await recipeService.create(recipeData);
    res.redirect("/recipes");
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("recipes/create", { ...recipeData, errors });
  }
});

module.exports = router;