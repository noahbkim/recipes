import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API } from '../../variables';
import { ItemService, Item } from './item';
import { Ingredient } from './ingredient';


/** Access ingredients from the API server. */
@Injectable()
export class IngredientService implements ItemService {

  /** Persist the editing ingredient. */
  public local: Ingredient = new Ingredient();

  /** Cache the full ingredient list to save bandwidth. */
  public cache: Item[] = [];
  public edited: Date = null;

  constructor(private http: HttpClient) {}

  /** Get the overview list of ingredients as items. */
  list(): Promise<Array<Item>> {
    return new Promise((resolve, reject) => {

      /** If we have an edited date from our current list, send with header. */
      let headers = new HttpHeaders();
      if (this.edited) headers = headers.set('after', this.edited.toJSON());

      /** Make the request. */
      this.http.get(API + '/ingredients', {headers, observe: 'response'}).subscribe(response => {
        if (response.status === 204) {
          console.log('Used cache for ingredients!');
          resolve(this.cache);
        } else {
          this.edited = new Date(response.headers.get('edited'));
          resolve(this.cache = (response.body as Array<{}>).map(value => new Item(value)));
        }
      }, reject);

    });
  }

  /** Get a full ingredient object from its ID. */
  get(id): Promise<Ingredient> {
    return new Promise((resolve, reject) => {
      this.http.get(API + '/ingredients/' + id).subscribe(data => {
        resolve(new Ingredient(data));
      }, reject);
    });
  }

  /** Create a new ingredient. */
  create(value: any): Promise<String> {
    return new Promise((resolve, reject) => {
      this.http.post(API + '/ingredients', value).subscribe(data => {
        resolve(data['id']);
      }, reject);
    });
  }

  /** Update an ingredient with its ID. */
  update(id: string, value: any): Promise<String> {
    return new Promise((resolve, reject) => {
      this.http.post(API + '/ingredients/' + id, value).subscribe(data => {
        resolve(data['id']);
      }, reject);
    });
  }

  /** Convenience method. */
  updateOrCreate(id, value): Promise<String> {
    return id === null ? this.create(value) : this.update(id, value);
  }

  /** Delete an ingredient. */
  delete(id): Promise<null> {
    return new Promise((resolve, reject) => {
      this.http.delete(API + '/ingredients/' + id).subscribe(data => {
        resolve();
      }, reject);
    });
  }

}
