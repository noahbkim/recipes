import { Item } from './item';

/** An ingredient is part of the */
export class Ingredient extends Item {

  /** Construct the model with a dictionary. */
  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }

}
