import { Document, Model, model, Schema } from 'mongoose';
import { asNotEmpty, asOptionalString, asString } from '../library/validators';


export interface Ingredient extends Document {
  name: string;
  description: string;
  updateFromJSON(data: any): void;
}


const IngredientSchema: Schema = new Schema({
  name: {type: String, unique: true},
  description: {type: String}
});

IngredientSchema.methods.toJSON = function(): {} {
  return {
    id: this.id,
    name: this.name,
    description: this.description
  };
};

IngredientSchema.methods.updateFromJSON = function(data: any): void {
  this.name = asNotEmpty(asString(data.name, 'invalid name'), 'empty name');
  this.description = asOptionalString(data.description);
};

IngredientSchema.statics.fromJSON = function(data: any): Ingredient {
  const ingredient = new IngredientModel();
  ingredient.updateFromJSON(data);
  return ingredient;
};

export const IngredientModel: Model<Ingredient> = model<Ingredient>('Ingredient', IngredientSchema);
