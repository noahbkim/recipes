export class Ingredient {
  id: String;
  name: String;
  description: String;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
