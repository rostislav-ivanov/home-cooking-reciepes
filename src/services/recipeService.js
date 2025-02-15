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

exports.update = async (recipeId, userId, recipeData) => {
  const recipe = await Recipes.findById(recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  if (recipe.owner.toString() !== userId) {
    throw new Error("You are not the owner of this recipe");
  }

  Object.assign(recipe, recipeData);

  return await recipe.save();
};

exports.delete = async (recipeId, userId) => {
  const recipe = await Recipes.findById(recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  if (recipe.owner.toString() !== userId) {
    throw new Error("You are not the owner of this recipe");
  }

  return await Recipes.findByIdAndDelete(recipeId);
};

exports.search = async (title) => {
  const recipes = await Recipes.find({
    title: { $regex: title, $options: "i" },
  })
    .select("_id title image description")
    .lean();

  return recipes;
};
