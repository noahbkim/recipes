import { Item } from './item';
import { Ingredient } from './ingredient';


/** A part is an ingredient and amount. */
export class Part {

  public amount: String;
  public id: String;
  public ingredient: Ingredient;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}

/** A full recipe. */
export class Recipe extends Item {

  description: String;
  ingredients: Array<Part>;
  steps: Array<String>;
  notes: String;
  starred: Boolean;

  /** Construct the model with a dictionary. */
  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }

}
