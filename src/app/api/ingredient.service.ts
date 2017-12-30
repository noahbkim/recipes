import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../variables';

import { ItemService, Item } from './item';
import { Ingredient } from './ingredient';

import { warnAndReject } from '../convenience';


/** Access ingredients from the API server. */
@Injectable()
export class IngredientService {

  /** Request an HTTP client injection to make API requests. */
  constructor(private http: HttpClient) {}

  /** Get the overview list of ingredients as items. */
  list(): Promise<Array<Item>> {
    return new Promise((resolve, reject) => {
      this.http.get(API + '/ingredients').subscribe(data => {
        resolve((data as Array<{}>).map(value => new Item(value)));
      }, warnAndReject(reject));
    });
  }

  /** Get a full ingredient object from its ID. */
  get(id): Promise<Ingredient> {
    return new Promise((resolve, reject) => {
      this.http.get(API + '/ingredients/' + id).subscribe(data => {
        resolve(new Ingredient(data));
      }, warnAndReject(reject));
    });
  }

}
