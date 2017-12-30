import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { IngredientService } from './api/ingredient.service';
import { RecipeService } from './api/recipe.service';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';
import { IngredientViewComponent } from './ingredients/view/view.component';
import { IngredientEditComponent } from './ingredients/edit/edit.component';
import { RecipeViewComponent } from './recipes/view/view.component';
import { RecipeEditComponent } from './recipes/edit/edit.component';

export const routes = [
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'ingredients/:id', component: IngredientViewComponent },
  { path: 'ingredients/:id/edit', component: IngredientEditComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeViewComponent },
  { path: 'recipes/:id/edit', component: RecipeEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    RecipesComponent,
    IngredientViewComponent,
    IngredientEditComponent,
    RecipeViewComponent,
    RecipeEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    IngredientService,
    RecipeService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
