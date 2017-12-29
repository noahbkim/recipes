import { Component } from '@angular/core';

import { Item } from './api/item';
import { Ingredient } from './api/ingredient';
import { Recipe } from './api/Recipe';

import { RecipeService } from './api/recipe.service';
import { IngredientService } from './api/ingredient.service';

enum Mode {
  RECIPES = 0,
  INGREDIENTS = 1
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Recipes';
  mode = Mode.RECIPES;
  library = Array<{}>();
  Mode = Mode;
  id: String;

  /** Construct the app component. */
  constructor(public recipes: RecipeService, public ingredients: IngredientService) {
    this.loadLibrary();
  }

  /** Load the current library. */
  loadLibrary() {
    this.recipes.list().then((data) => {
      this.library = data;
    }, (error) => {
      console.warn(error);
    });
  }

}
