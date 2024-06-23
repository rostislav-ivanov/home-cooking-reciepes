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

router.get("/", async (req, res) => {
  try {
    const recipes = await recipeService.getAll();
    res.render("recipes/catalog", { recipes });
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("recipes/catalog", { errors });
  }
});

router.get("/details/:recipeId", async (req, res) => {
  try {
    const recipe = await recipeService.getOne(req.params.recipeId);
    let isOwner = false;
    let isRecommended = false;
    if (req.user) {
      isOwner = recipe.owner.toString() === req.user._id.toString();
      isRecommended = recipe.recommendList.some(
        (x) => x.toString() === req.user._id.toString()
      );
    }
    res.render("recipes/details", { ...recipe, isOwner, isRecommended });
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("recipes/details", { errors });
  }
});

router.get("/recommend/:recipeId", isUser, async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;
    await recipeService.recommend(recipeId, userId);
    res.redirect(`/recipes/details/${req.params.recipeId}`);
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("recipes/details", { errors });
  }
});

router.get("/edit/:recipeId", isUser, async (req, res) => {
  try {
    const recipe = await recipeService.getOne(req.params.recipeId);
    if (recipe.owner.toString() !== req.user._id.toString()) {
      throw new Error("You are not the owner of this recipe");
    }
    res.render("recipes/edit", { ...recipe });
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("recipes/edit", { errors });
  }
});

router.post("/edit/:recipeId", isUser, async (req, res) => {
  const recipeData = req.body;
  const recipeId = req.params.recipeId;
  const userId = req.user._id;
  try {
    await recipeService.update(recipeId, userId, recipeData);
    res.redirect(`/recipes/details/${req.params.recipeId}`);
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("recipes/edit", { ...recipeData, errors });
  }
});

router.get("/delete/:recipeId", isUser, async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;
    await recipeService.delete(recipeId, userId);
    res.redirect("/recipes");
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("recipes/details", { errors });
  }
});

router.get("/search", async (req, res) => {
  try {
    const recipes = await recipeService.getAll();
    res.render("recipes/search", { recipes });
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("recipes/search", { errors });
  }
});

router.post("/search", async (req, res) => {
  const title = req.body.title;
  try {
    const recipes = await recipeService.search(title);
    res.render("recipes/search", { recipes, title });
  } catch (err) {
    const errors = parseError(err).errors;
    res.render("recipes/search", { errors });
  }
});

module.exports = router;
