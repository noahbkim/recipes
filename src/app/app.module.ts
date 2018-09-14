import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { IngredientService } from './api/ingredient.service';
import { RecipeService } from './api/recipe.service';
import { UserService } from './api/user.service';

import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';
import { IngredientViewComponent } from './ingredients/view/view.component';
import { IngredientEditComponent } from './ingredients/edit/edit.component';
import { RecipeViewComponent } from './recipes/view/view.component';
import { RecipeEditComponent } from './recipes/edit/edit.component';
import { PartEditorComponent } from './recipes/edit/part/part.component';
import { StepEditorComponent } from './recipes/edit/step/step.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';


export const routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'ingredients/new', component: IngredientEditComponent, canActivate: [AuthGuard] },
  { path: 'ingredients/:id', component: IngredientViewComponent },
  { path: 'ingredients/:id/edit', component: IngredientEditComponent, canActivate: [AuthGuard] },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/new', component: RecipeEditComponent, canActivate: [AuthGuard] },
  { path: 'recipes/:id', component: RecipeViewComponent },
  { path: 'recipes/:id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
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
    PartEditorComponent,
    StepEditorComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    IngredientService,
    RecipeService,
    UserService,
    AuthGuard,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
