import { Component } from '@angular/core';

import { Item, ItemService } from './api/item';
import { Ingredient } from './api/ingredient';
import { Recipe } from './api/recipe';

import { RecipeService } from './api/recipe.service';
import { IngredientService } from './api/ingredient.service';

import { warn } from './api/convenience';

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

  /** Get the correct items service. */
  get itemService(): ItemService { return this.mode === RECIPES ? this.recipes : this.ingredients; }

  /** Load the current library. */
  loadItems() {
    this.itemService.list().then(data => this.items = data, warn());
  }

  /** Set the mode from recipes to ingredients. */
  setMode(mode: String) { this.mode = mode; }

  /** Get the current item. */
  get item(): Item { return this.mode === RECIPES ? this.recipe : this.ingredient; }

  /** Set the recipe or ingredient. */
  setItem(item) { this.mode === RECIPES ? this.setRecipe(item) : this.setIngredient(item); }

  /** Set the recipe. */
  setRecipe(id) {
    this.mode = RECIPES;
    this.recipes.get(id).then(recipe => this.recipe = recipe, warn());
  }

  /** Set the ingredient. */
  setIngredient(id) {
    this.mode = INGREDIENTS;
    this.recipes.get(id).then(recipe => this.recipe = recipe, warn());
  }

  /** Check if we have an item. */
  hasItem(): Boolean { return this.item !== null; }

  /** Clear recipes and items. */
  clearItem() { this.recipe = this.ingredient = null; }

}
