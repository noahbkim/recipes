import { Schema } from 'mongoose';
import { asOptionalNumber, asOptionalString, Invalid } from '../library/validators';


export interface Amount extends Document {
  measure: number;
  units: string;
  toJSON(): any;
  updateFromJSON(data: any): void;
}

export const AmountSchema = new Schema({
  measure: {type: Number},
  units: {type: String}
});

AmountSchema.methods.toJSON = function(): {} {
  return {
    measure: this.measure,
    units: this.units
  };
};

AmountSchema.methods.updateFromJSON = function(data: any): void {
  this.measure = asOptionalNumber(data.measure);
  this.units = asOptionalString(data.units);
  if (this.measure === undefined && this.units === '')
    throw new Invalid('amount must have measure or units');
};


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


export interface Step {
  description: string;
  toJSON(): any;
  updateFromJSON(data: any): void;
}

export const StepSchema = new Schema({
  description: String
});
