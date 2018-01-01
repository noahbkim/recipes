import { Item } from './item';
import { Ingredient } from './ingredient';


/** A part is an ingredient and amount. */
export class Part {

  public amount: String = '';
  public id: String = '';
  public ingredient: Ingredient;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  toJSON(): {} {
    return {amount: this.amount, id: this.id};
  }

}

/** Step container. */
export class Step {

  public description: String = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  toJSON(): {} {
    return {description: this.description};
  }

}

/** A full recipe. */
export class Recipe extends Item {

  description: String;
  ingredients: Array<Part>;
  steps: Array<Step>;
  notes: String;
  starred: Boolean;

  /** Construct the model with a dictionary. */
  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }

  toJSON(): {} {
    const base = super.toJSON();
    Object.assign(base, {
      description: this.description,
      ingredients: this.ingredients.map(ingredient => ingredient.toJSON()),
      steps: this.steps.map(step => step.toJSON()),
      notes: this.notes,
      starred: this.starred
    });
    return base;
  }

}
