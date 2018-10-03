import { Schema } from 'mongoose';
import { asNotEmpty, asOptionalNumber, asOptionalString, asString, Invalid } from '../library/validators';


export interface Amount extends Document {
  measure: number;
  units: string;
}

export const AmountSchema = new Schema({
  measure: {type: Number},
  units: {type: String}
});

export function asAmount(data: any): {} {
  const measure = asOptionalNumber(data.measure);
  const units = asOptionalString(data.units);
  if (measure === undefined && units === '')
    throw new Invalid('amount must have measure or units');
  return {measure, units};
}


export interface Part {
  ingredient: string;
  amount: string;
  toJSON(): any;
  updateFromJSON(data: any): void;
}

export const PartSchema = new Schema({
  ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient'},
  amount: AmountSchema
});

export function asPart(data: any): {} {
  const ingredient = asNotEmpty(asString(data.ingredient, 'invalid ingredient id'), 'missing ingredient id');
  const amount = asAmount(data.amount);
  return {ingredient, amount};
}


export interface Step {
  description: string;
  toJSON(): any;
  updateFromJSON(data: any): void;
}

export const StepSchema = new Schema({
  description: String
});

export function asStep(data: any): {} {
  const description = asNotEmpty(asString(data.description));
  return {description};
}
