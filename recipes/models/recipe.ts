import { Document, DocumentToObjectOptions, Model, model, Schema } from 'mongoose';

import { asPart, asStep, Part, PartSchema, Step, StepSchema } from './schemas';
import { asArray, asNotEmpty, asOptionalArray, asOptionalString, asString } from '../library/validators';


interface PreviewDocumentToObjectOptions extends DocumentToObjectOptions {
  preview?: boolean;
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


const RecipeSchema = new Schema({
  name: {type: String, unique: true},
  description: {type: String},
  parts: {type: [PartSchema]},
  steps: {type: [StepSchema]},
  notes: {type: String},
  tags: {type: [String]}
});

RecipeSchema.methods.toJSON = function(options?: PreviewDocumentToObjectOptions): {} {

  if (options && options.preview) return {
    id: this.id,
    name: this.name,
    description: this.description};

  return {
    id: this.id,
    name: this.name,
    description: this.description,
    parts: this.parts.map(part => part.toJSON()),
    steps: this.steps,
    notes: this.notes,
    tags: this.tags
  };
};

RecipeSchema.methods.updateFromJSON = function(data: any): void {
  this.name = asNotEmpty(asString(data.name, 'invalid name'), 'empty name');
  this.description = asOptionalString(data.description);
  this.parts = asArray(data.parts, 'invalid parts').map(asPart);
  this.steps = asArray(data.steps, 'invalid steps').map(asStep);
  this.notes = asOptionalString(data.notes);
  this.tags = asOptionalArray(data.tags).map((value: any) => asString(value));
};

RecipeSchema.statics.fromJSON = function(data: any): Recipe {
  const recipe = new RecipeModel();
  recipe.updateFromJSON(data);
  return recipe;
};


export const RecipeModel: Model<Recipe> = model<Recipe>('Recipe', RecipeSchema);
