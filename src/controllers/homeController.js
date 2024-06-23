const router = require("express").Router();
const recipeService = require("../services/recipeService");
const { parseError } = require("../utils/errorUtils");

router.get("/", async (req, res) => {
  try {
    const recipes = await recipeService.getThreeLatestRecipes();
    res.render("home", { recipes });
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("home", { errors });
  }
});

module.exports = router;
