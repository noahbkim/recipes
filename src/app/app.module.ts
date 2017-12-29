import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { ViewComponent } from './view/view.component';

import { IngredientService } from './api/ingredient.service';
import { RecipeService } from './api/recipe.service';


@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
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
