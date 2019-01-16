import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../../variables';
import { ItemService } from './item';
import { Ingredient } from './ingredient';


/** Access ingredients from the API server. */
@Injectable()
export class IngredientService extends ItemService {

  public prefix = '/ingredients';

  /** Persist the editing ingredient. */
  public local: Ingredient = new Ingredient();

  constructor(protected http: HttpClient) { super(); }

  /** Get a full ingredient object from its ID. */
  get(id): Promise<Ingredient> {
    return new Promise((resolve, reject) => {
      this.http.get(API + this.prefix + '/' + id).subscribe(data => {
        resolve(new Ingredient(data));
      }, reject);
    });
  }

}
