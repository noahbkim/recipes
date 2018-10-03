import { Document, Model, model, Schema } from 'mongoose';

import { Amount, AmountSchema } from './schemas';
import { asNotEmpty, asNumber, asOptionalNumber, asOptionalString, asString } from '../library/validators';


export interface Stock extends Document {
  name: string;
  description: string;
  price: number;
  amount: Amount;
  count: number;
  ingredient: string;
  updateFromJSON(data: any): void;
}


const StockSchema: Schema = new Schema({
  name: {type: String},
  description: {type: String},
  price: {type: Number},
  amount: {type: AmountSchema},
  count: {type: Number},
  ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient'}
});

StockSchema.methods.toJSON = function(): {} {
  return {
    id: this.id,
    name: this.name,
    description: this.description,
    price: this.price,
    amount: this.amount,
    count: this.count,
    ingredient: this.ingredient
  };
};

StockSchema.methods.updateFromJSON = function(data: any): void {
  this.name = asNotEmpty(asString(data.name, 'invalid name'), 'empty name');
  this.description = asOptionalString(data.description);
  this.price = asOptionalNumber(data.price);
  this.amount = (AmountSchema as any).fromJSON(data.amount);
  this.count = asNumber(data.count);
  this.ingredient = asString(data.ingredient);
};

StockSchema.statics.fromJSON = function(data: any): Stock {
  const stock = new StockModel();
  stock.updateFromJSON(data);
  return stock;
};

export const StockModel: Model<Stock> = model<Stock>('Ingredient', StockSchema);

