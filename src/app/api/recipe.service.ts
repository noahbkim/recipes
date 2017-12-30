import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IngredientService } from './ingredient.service';
import { Item, ItemService } from './item';
import { Recipe } from './recipe';

import { warnAndReject } from '../convenience';

import { API } from '../../variables';


/** The recipe interface for the API server. */
@Injectable()
export class RecipeService implements ItemService {

  /** Require an HTTP client and ingredients service. */
  constructor(private http: HttpClient, private ingredients: IngredientService) { }

  /** Get the list of recipes as items. */
  list(): Promise<Array<Item>> {
    return new Promise((resolve, reject) => {
      this.http.get(API + '/recipes').subscribe((data) => {
        resolve((data as Array<{}>).map(value => new Item(value)));
      }, reject);
    });
  }

  /** Get a full recipe object from an ID. */
  get(id): Promise<Recipe> {
    return new Promise((resolve, reject) => {
      this.http.get(API + '/recipes/' + id).subscribe(data => {
        data = data as {};
        data['ingredients'].map(component => {
          this.ingredients.get(component['ingredient']).then(ingredient => {
            component['ingredient'] = ingredient;
          }, error => {
            console.warn(error);
            component['ingredient'] = null;
          });
        });
        resolve(new Recipe(data));
      }, reject);
    });
  }

  /** Create a new recipe. */
  create(data) {}

  /** Update a recipe. */
  update(id, data) {}

}
