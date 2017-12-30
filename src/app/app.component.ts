import { Component } from '@angular/core';

import { Item } from './api/item';
import { Ingredient } from './api/ingredient';
import { Recipe } from './api/Recipe';

import { RecipeService } from './api/recipe.service';
import { IngredientService } from './api/ingredient.service';

const RECIPES: String = 'Recipes';
const INGREDIENTS: String = 'Ingredients';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Recipes';

  RECIPES: String = RECIPES;
  INGREDIENTS: String = INGREDIENTS;
  mode: String = RECIPES;

  library = Array<Item>();
  recipe: Recipe = null;
  ingredient: Ingredient = null;

  /** Construct the app component. */
  constructor(public recipes: RecipeService, public ingredients: IngredientService) {
    this.loadLibrary();
  }

  /** Load the current library. */
  loadLibrary() {
    if (this.mode === RECIPES) {
      this.recipes.list().then((data) => {
        this.library = data;
        console.log(this.library);
      }, (error) => {
        console.warn(error);
      });
    } else {

    }
  }

  /** Set the recipe. */
  setRecipe(recipe) {
    this.mode = RECIPES;
    this.recipe = recipe;
  }

  /** Set the ingredient. */
  setIngredient(ingredient) {
    this.mode = INGREDIENTS;
    this.ingredient = ingredient;
  }

  /** Get the current item. */
  getItem() {
    if (this.mode === RECIPES) { return this.recipe; }
    return this.ingredient;
  }

  /** Check if we have an item. */
  hasItem() {
    return this.getItem() !== null;
  }

}
