import { Schema } from 'mongoose';
import { asNotEmpty, asString } from '../library/validators';


export interface Part {
  ingredient: string;
  amount: string;
  toJSON(): {};
}

export const PartSchema = new Schema({
  ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient'},
  amount: {type: String}
}, {_id: false});

PartSchema.methods.toJSON = function(): {} {
  return {ingredient: this.ingredient.toString(), amount: this.amount};
};

export function asPart(data: any): {} {
  const ingredient = asNotEmpty(asString(data.ingredient, 'invalid ingredient id'), 'missing ingredient id');
  const amount = asString(data.amount);
  return {ingredient, amount};
}


export interface Step {
  description: string;
}

export const StepSchema = new Schema({
  description: String
}, {_id: false});

export function asStep(data: any): {} {
  const description = asNotEmpty(asString(data.description));
  return {description};
}
