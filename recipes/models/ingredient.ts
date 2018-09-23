import { Document, Model, model, Schema } from 'mongoose';
import { asNotEmpty, asOptionalString, asString } from '../validators';


export interface Ingredient extends Document {
  name: string;
  description: string;
}


const IngredientSchema: Schema = new Schema({
  name: {type: String, unique: true},
  description: String
});

IngredientSchema.methods.toJSON = function(): {} {
  return {
    name: this.name,
    description: this.description
  };
};

IngredientSchema.methods.validate = function(data: any): Ingredient {
  const ingredient = new IngredientModel();
  ingredient.name = asNotEmpty(asString(data.name, 'invalid name'), 'empty name');
  ingredient.description = asOptionalString(data.description);
  return ingredient;
};

export const IngredientModel: Model<Ingredient> = model<Ingredient>('Ingredient', IngredientSchema);
