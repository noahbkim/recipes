import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IngredientService } from './ingredient.service';
import { Item, ItemService } from './item';
import { Recipe, Part, Step } from './recipe';

import { API } from '../../variables';
import { warn } from '../convenience';


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

        /* Create the recipe. */
        data = data as {};
        data['parts'] = data['parts'].map(values => new Part(values));
        data['steps'] = data['steps'].map(values => new Step(values));
        const recipe = new Recipe(data);

        /* Map and pull all the ingredients for the parts, resolving when finished. */
        Promise.all(data['parts'].map(part => new Promise((resolve2, reject2) => {
          this.ingredients.get(part.id).then(ingredient => {
            part.ingredient = ingredient;
            resolve2();
          }, reject2);
        }))).then(value => resolve(recipe), warn());

      }, reject);
    });
  }

  /** Create a new recipe. */
  create(data) {}

  /** Update a recipe. */
  update(id, data) {}

}
