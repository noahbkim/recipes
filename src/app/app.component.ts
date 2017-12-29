import { Component } from '@angular/core';

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
  Mode = Mode;
  id: String;
  constructor(public recipes: RecipeService, public ingredients: IngredientService) {}
  getLibrary(): Promise<{}> {
    if (this.mode === Mode.RECIPES) {
      return this.recipes.list();
    } else {
      return this.ingredients.list();
    }
  }
}
