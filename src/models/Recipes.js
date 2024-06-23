const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title should be at least 2 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description should be at least 10 characters"],
      maxlength: [100, "Description should be at most 100 characters"],
    },
    ingredients: {
      type: String,
      required: [true, "Ingredients is required"],
      minlength: [10, "Ingredients should be at least 10 characters"],
      maxlength: [200, "Ingredients should be at most 200 characters"],
    },
    instructions: {
      type: String,
      required: [true, "Instructions is required"],
      minlength: [10, "Instructions should be at least 10 characters"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      match: [/^https?:\/\//, "Image should start with http:// or https://"],
    },
    recommendList: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
