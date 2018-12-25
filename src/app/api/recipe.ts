import { Item } from './item';
import { Ingredient } from './ingredient';


/** A part is an ingredient and amount. */

/*export class Amount {

  public measure: number;
  public units: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  static fromJSON(data: {}): Amount {
    return new Amount({
      measure: data['measure'],
      units: data['units']
    });
  }

}*/


export class Part {

  public amount: string = '';
  public ingredient: Ingredient = new Ingredient();

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  static fromJSON(data: {}): Part {
    console.log(data);
    return new Part({
      amount: data['amount'], //Amount.fromJSON(data['amount']),
      ingredient: new Ingredient({id: data['ingredient']})
    });
  }

  toJSON(): {} {
    return {amount: this.amount, ingredient: this.ingredient.id};
  }

}

/** Step container. */
export class Step {

  public description: String = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  static fromJSON(data: any): Step {
    return new Step({
      description: data['description']
    });
  }

  toJSON(): {} {
    return {description: this.description};
  }

}

/** A full recipe. */
export class Recipe extends Item {

  parts: Part[] = [];
  steps: Step[] = [];
  notes: String;
  starred: Boolean;

  /** Construct the model with a dictionary. */
  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }

  static fromJSON(data: {}): Recipe {
    return new Recipe({
      id: data['id'],
      name: data['name'],
      description: data['description'],
      parts: data['parts'].map(Part.fromJSON),
      steps: data['steps'].map(Step.fromJSON),
      notes: data['notes'],
      starred: data['starred']
    });
  }

  toJSON(): {} {
    const base = super.toJSON();
    Object.assign(base, {
      parts: this.parts.map(part => part.toJSON()),
      steps: this.steps.map(step => step.toJSON()),
      notes: this.notes,
      starred: this.starred
    });
    return base;
  }

}
