/** Basic interface for listing ingredients and recipes. */
export class Item {

  id: String = null;
  name: String;
  description: String;

  /** Construct the model with a dictionary. */
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  toJSON(): {} {
    return {id: this.id, name: this.name, description: this.description};
  }

}

/** Simple interface for API service. */
export interface ItemService {

  /** Get the list of items. */
  list(): Promise<Array<Item>>;

}
