import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../variables';


/** Basic interface for listing ingredients and recipes. */
export class Item {

  id: string = null;
  name: string;
  description: string;

  /** Construct the model with a dictionary. */
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  toJSON(): {} {
    return {id: this.id, name: this.name, description: this.description};
  }

}


export class ItemService {

  public prefix: string;

  /** Cache the item list to save bandwidth. */
  public cache: Item[] = [];
  public edited: Date = null;

  /** HTTP client is passed from extended service. */
  protected http: HttpClient;

  constructor() {}

  /** Get the list of recipes as items. */
  list(): Promise<Array<Item>> {
    return new Promise((resolve, reject) => {

      /* If we have an edited date from our current list, send with header. */
      let headers = new HttpHeaders();
      if (this.edited) headers = headers.set('after', this.edited.toJSON());
      this.http.get(API + this.prefix, {headers, observe: 'response'}).subscribe(response => {

        /* 204 means we have the current ingredient list already. */
        if (response.status === 204) {
          resolve(this.cache);
        } else {
          this.edited = new Date(response.headers.get('edited'));
          resolve(this.cache = (response.body as Array<{}>).map(value => new Item(value)));
        }
      }, reject);
    });
  }

  /** Create a new ingredient. */
  create(value: any): Promise<Item> {
    return new Promise((resolve, reject) => {
      this.http.post(API + '/ingredients', value).subscribe(data => {
        resolve(new Item(data));
      }, reject);
    });
  }

  /** Update an ingredient with its ID. */
  update(id: string, value: any): Promise<Item> {
    return new Promise((resolve, reject) => {
      this.http.post(API + '/ingredients/' + id, value).subscribe(data => {
        resolve(new Item(data));
      }, reject);
    });
  }

  /** Convenience method. */
  updateOrCreate(id: string, value: any): Promise<Item> {
    return id === null ? this.create(value) : this.update(id, value);
  }

  /** Delete an ingredient. */
  delete(id): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete(API + '/ingredients/' + id).subscribe(() => resolve(), reject);
    });
  }

}

