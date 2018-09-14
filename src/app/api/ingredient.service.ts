import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../../variables';
import { ItemService, Item } from './item';
import { Ingredient } from './ingredient';


/** Access ingredients from the API server. */
@Injectable()
export class IngredientService implements ItemService {

  /** Persist the editing ingredient. */
  public local: Ingredient = new Ingredient();
  public cache: Item[] = null;

  /** Request an HTTP client injection to make API requests. */
  constructor(private http: HttpClient) {}

  /** Get the overview list of ingredients as items. */
  list(cached = false): Promise<Array<Item>> {
    return new Promise((resolve, reject) => {
      if (cached && this.cache) { resolve(this.cache); }
      this.http.get(API + '/ingredients').subscribe(data => {
        resolve(this.cache = (data as Array<{}>).map(value => new Item(value)));
      }, reject);
    });
  }

  /** Get a full ingredient object from its ID. */
  get(id): Promise<Ingredient> {
    return new Promise((resolve, reject) => {
      this.http.get(API + '/ingredients/' + id).subscribe(data => {
        console.log(data);
        resolve(new Ingredient(data));
      }, reject);
    });
  }

  /** Create a new ingredient. */
  create(value): Promise<String> {
    return new Promise((resolve, reject) => {
      this.http.post(API + '/ingredients', value).subscribe(data => {
        resolve(data['id']);
      }, reject);
    });
  }

  /** Update an ingredient with its ID. */
  update(id, value): Promise<String> {
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
