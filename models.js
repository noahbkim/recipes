const mongoose = require("mongoose");
const Schema = mongoose.Schema;


/** Generate an updater function. */
function makeUpdateFromRequest(fields) {
  return function(req) {
    for (let field of fields)
      if (req.body.hasOwnProperty(field))
        this[field] = req.body[field];
  }
}

/** Generate a JSON export. */
function makeToJSON(fields) {
  return function() {
    let data = {};
    for (let field of fields) 
      data[field] = this[field];
    return data;
  }
}


/* Schema for a basic ingredient. */
const IngredientSchema = new Schema({
  name: {type: String, unique: true},
  description: String,
});

/* Update and JSON methods. */
const ingredientFields = ["name", "description"];
IngredientSchema.methods.updateFromRequest = makeUpdateFromRequest(ingredientFields);
IngredientSchema.methods.toJSON = makeToJSON(ingredientFields.concat("id"));


/** Schema for recipes. */
const RecipeSchema = new Schema({
  name: {type: String, unique: true},
  description: String,
  parts: {type: [{
    id: {type: Schema.Types.ObjectId, ref: "Ingredient", required: true},
    amount: String,
  }], validate: [(arr) => arr.length > 0]},
  steps: {type: [String]},
  notes: String,
  starred: Boolean
});

/* Update and JSON methods. */
const recipeFields = ["name", "description", "ingredients", "steps", "notes", "starred"];
RecipeSchema.methods.updateFromRequest = makeUpdateFromRequest(recipeFields);
RecipeSchema.methods.toJSON = makeToJSON(recipeFields.concat("id"));


/** Export the actual models. */
module.exports = {
  Ingredient: mongoose.model("Ingredient", IngredientSchema),
  Recipe: mongoose.model("Recipe", RecipeSchema)
}
