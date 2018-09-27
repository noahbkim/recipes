import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IngredientService } from './ingredient.service';
import { Item, ItemService } from './item';
import { Recipe, Part, Step } from './recipe';

import { API } from '../../variables';
import { warn } from '../convenience';


/** The recipe interface for the API server. */
@Injectable()
export class RecipeService extends ItemService {

  public prefix = '/recipes';

  /** Persist the editing ingredient. */
  public local: Recipe = new Recipe();

  /** Require an HTTP client and ingredients service. */
  constructor(protected http: HttpClient, private ingredients: IngredientService) { super(); }

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
        }))).then(() => resolve(recipe), warn());

      }, reject);
    });
  }

}
