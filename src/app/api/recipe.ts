import { Item } from './item';

/** A full recipe. */
export class Recipe extends Item {

  ingredients: Array<Object>;
  steps: Array<String>;
  notes: String;
  starred: Boolean;

  /** Construct the model with a dictionary. */
  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }

}
