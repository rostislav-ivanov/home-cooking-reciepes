const Recipes = require("../models/Recipes");

exports.create = async (recipeData) => await Recipes.create(recipeData);

exports.getAll = async () =>
  await Recipes.find().select("_id title image description").lean();
