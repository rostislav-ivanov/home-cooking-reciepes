const Recipes = require("../models/Recipes");

exports.create = async (recipeData) => await Recipes.create(recipeData);
