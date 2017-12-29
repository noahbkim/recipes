export class Recipe {
  id: String;
  name: String;
  description: String;
  ingredients: Array<{}>;
  steps: Array<String>;
  notes: String;
  starred: Boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
