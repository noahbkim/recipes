import { Item } from './item';
import { Ingredient } from './ingredient';

/** A full recipe. */
export class Recipe extends Item {

  ingredients: Array<{amount: String, ingredient: Ingredient}>;
  steps: Array<String>;
  notes: String;
  starred: Boolean;

  /** Construct the model with a dictionary. */
  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }

}
