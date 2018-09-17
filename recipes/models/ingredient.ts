import { Document, Model, model, Schema } from 'mongoose';


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

export const IngredientModel: Model<Ingredient> = model<Ingredient>('Ingredient', IngredientSchema);
