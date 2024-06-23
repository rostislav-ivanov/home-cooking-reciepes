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
