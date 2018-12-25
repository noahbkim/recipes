import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IngredientService } from './ingredient.service';
import { ItemService } from './item';
import { Recipe } from './recipe';

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
      this.http.get(API + this.prefix + '/' + id).subscribe(data => {

        /* Create the recipe. */
        const recipe = Recipe.fromJSON(data);

        /* Map and pull all the ingredients for the parts, resolving when finished. */
        Promise.all(data['parts'].map(part => new Promise((resolve2, reject2) => {
          this.ingredients.get(part.ingredient.id).then(ingredient => {
            part.ingredient = ingredient;
            resolve2();
          }, reject2);
        }))).then(() => resolve(recipe), warn());

      }, reject);
    });
  }

}
