import { Document, Model, model, Schema } from 'mongoose';
import { Ingredient } from './ingredient';


export interface Part {
  id: string;
  amount: string;
}

export interface Step {
  description: string;
}

export interface Recipe extends Document {
  name: string;
  description: string;
  parts: Array<Part>;
  steps: Array<Step>;
  notes: string;
  tags: Array<string>;
}


const PartSchema = {
  ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient'},
  amount: String
};

const StepSchema = {
  description: String
};

const RecipeSchema: Schema = new Schema({
  name: {type: String, unique: true},
  description: String,
  parts: [PartSchema],
  steps: [StepSchema],
  notes: String,
  tags: [String]
});

RecipeSchema.methods.toJSON = function(full = false): {} {
  return full ? {
    name: this.name,
    description: this.description,
    parts: this.parts,
    steps: this.steps,
    notes: this.notes,
    tags: this.tags
  } : {
    name: this.name,
    description: this.description,
  };
};


export const RecipeModel: Model<Recipe> = model<Recipe>('Recipe', RecipeSchema);
