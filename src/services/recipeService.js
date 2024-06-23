const Recipes = require("../models/Recipes");

exports.create = async (recipeData) => await Recipes.create(recipeData);

exports.getAll = async () =>
  await Recipes.find().select("_id title image description").lean();

exports.getThreeLatestRecipes = async () =>
  await Recipes.find()
    .select("_id title image description")
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

exports.getOne = async (recipeId) => await Recipes.findById(recipeId).lean();

exports.recommend = async (recipeId, userId) => {
  const recipe = await Recipes.findById(recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  if (recipe.owner.toString() === userId) {
    throw new Error("You cannot recommend your own recipe");
  }

  if (recipe.recommendList.some((x) => x.toString() === userId)) {
    throw new Error("You have already recommended this recipe");
  }

  recipe.recommendList.push(userId);

  return await recipe.save();
};
