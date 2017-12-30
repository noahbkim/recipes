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

  title: String = 'Recipes';

  RECIPES: String = RECIPES;
  INGREDIENTS: String = INGREDIENTS;
  mode: String = RECIPES;

  items: Array<Item> = Array<Item>();
  recipe: Recipe = null;
  ingredient: Ingredient = null;

  /** Construct the app component. */
  constructor(public recipes: RecipeService, public ingredients: IngredientService) {
    this.loadItems();

  }

  /** Load the current library. */
  loadItems() {
    if (this.mode === RECIPES) {
      this.recipes.list().then((data) => {
        this.items = data;
      }, (error) => {
        console.warn(error);
      });
    } else {

    }
  }

  /** Set the mode from recipes to ingredients. */
  setMode(mode: String) {
    this.mode = mode;
  }

  /** Set the recipe or ingredient. */
  setItem(item) {
    if (item instanceof Recipe) { return this.setRecipe(item); }
    return this.setIngredient(item);
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

  /** Clear recipes and items. */
  clearItem() {
    this.recipe = this.ingredient = null;
  }

  /** Set the recipe. */
  setRecipe(recipe) {
    this.mode = RECIPES;
    return this.recipe = recipe;
  }

  /** Set the ingredient. */
  setIngredient(ingredient) {
    this.mode = INGREDIENTS;
    return this.ingredient = ingredient;
  }

}
