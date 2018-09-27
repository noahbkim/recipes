import { Document, DocumentToObjectOptions, Model, model, Schema } from 'mongoose';
import { Ingredient } from './ingredient';
import { asArray, asNotEmpty, asOptionalArray, asOptionalString, asString } from '../library/validators';


interface PreviewDocumentToObjectOptions extends DocumentToObjectOptions {
  preview?: boolean;
}


export interface Part {
  ingredient: string;
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
  updateFromJSON(data: any): void;
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
  description: {type: String},
  parts: {type: [PartSchema]},
  steps: {type: [StepSchema]},
  notes: {type: String},
  tags: {type: [String]}
});

RecipeSchema.methods.toJSON = function(options?: PreviewDocumentToObjectOptions): {} {
  return options && options.preview ? {
    id: this.id,
    name: this.name,
    description: this.description
  } : {
    id: this.id,
    name: this.name,
    description: this.description,
    parts: this.parts,
    steps: this.steps,
    notes: this.notes,
    tags: this.tags
  };
};

RecipeSchema.methods.updateFromJSON = function(data: any): void {
  this.name = asNotEmpty(asString(data.name, 'invalid name'), 'empty name');
  this.description = asOptionalString(data.description);
  this.parts = asArray(data.parts, 'invalid parts').map((value: any) => ({
    ingredient: asNotEmpty(asString(value.ingredient)),
    amount: asNotEmpty(asString(value.amount))
  }));
  this.steps = asArray(data.steps, 'invalid steps').map((value: any) => ({
    description: asNotEmpty(asString(value.description))
  }));
  this.notes = asOptionalString(data.notes);
  this.tags = asOptionalArray(data.tags).map((value: any) => asString(value));
};

RecipeSchema.statics.fromJSON = function(data: any): Recipe {
  const recipe = new RecipeModel();
  recipe.updateFromJSON(data);
  return recipe;
};


export const RecipeModel: Model<Recipe> = model<Recipe>('Recipe', RecipeSchema);