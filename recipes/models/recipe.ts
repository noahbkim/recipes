import { Document, DocumentToObjectOptions, Model, model, Schema } from 'mongoose';
import { Ingredient } from './ingredient';
import { asArray, asNotEmpty, asOptionalArray, asOptionalString, asString } from '../validators';


interface PreviewDocumentToObjectOptions extends DocumentToObjectOptions {
  preview?: boolean;
}


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
  toJSON(PreviewDocumentToObjectOptions?): any;
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

RecipeSchema.methods.toJSON = function(options?: PreviewDocumentToObjectOptions): {} {
  return options.preview ? {
    name: this.name,
    description: this.description
  } : {
    name: this.name,
    description: this.description,
    parts: this.parts,
    steps: this.steps,
    notes: this.notes,
    tags: this.tags
  };
};

RecipeSchema.statics.validate = function(data: any): Recipe {
  const recipe = new RecipeModel();
  recipe.name = asNotEmpty(asString(data.name, 'invalid name'), 'empty name');
  recipe.description = asOptionalString(data.description);
  recipe.parts = asArray(data.parts, 'invalid parts').map((value: any) => ({
    id: asNotEmpty(asString(value.id)),
    amount: asNotEmpty(asString(value.amount))
  }));
  recipe.steps = asArray(data.steps, 'invalid steps').map((value: any) => ({
    description: asNotEmpty(asString(value.description))
  }));
  recipe.notes = asOptionalString(data.notes);
  recipe.tags = asOptionalArray(data.tags).map((value: any) => asString(value));
  return recipe;
};


export const RecipeModel: Model<Recipe> = model<Recipe>('Recipe', RecipeSchema);