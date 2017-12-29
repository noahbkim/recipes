const mongoose = require("mongoose");

const Schema = mongoose.Schema;


function makeUpdateFromRequest(fields) {
  return function(req) {
    for (let field of fields)
      if (req.body.hasOwnProperty(field))
        this[field] = req.body[field];
  }
}

function makeToJSON(fields) {
  return function() {
    let data = {};
    for (let field of fields) 
      data[field] = this[field];
    return data;
  }
}


const IngredientSchema = new Schema({
  name: {type: String, unique: true},
  description: String,
});

IngredientSchema.methods.updateFromRequest = makeUpdateFromRequest([
  "name", "description"]);
IngredientSchema.methods.toJSON = makeToJSON([
  "id", "name", "description"]);

const RecipeSchema = new Schema({
  name: {type: String, unique: true},
  description: String,
  ingredients: {type: [{
    ingredient: {type: Schema.Types.ObjectId, ref: "Ingredient", required: true},
    amount: String,
  }], validate: [(arr) => arr.length > 0]},
  steps: {type: [String]},
  notes: String,
  starred: Boolean
});

RecipeSchema.methods.updateFromRequest = makeUpdateFromRequest([
  "name", "description", "ingredients", "steps", "notes", "starred"]);
RecipeSchema.methods.toJSON = makeToJSON([
  "id", "name", "description", "ingredients", "steps", "notes", "starred"]);

module.exports = {
  Ingredient: mongoose.model("Ingredient", IngredientSchema),
  Recipe: mongoose.model("Recipe", RecipeSchema)
}
