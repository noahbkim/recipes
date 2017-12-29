const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: String,
  description: String,
  ingredients: [String],
  steps: [String],
  notes: String,
  starred: Boolean
});

module.exports = mongoose.model("Recipe", RecipeSchema);
