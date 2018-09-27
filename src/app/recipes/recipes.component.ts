import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../api/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  constructor(public recipes: RecipeService) {}

  /** Update the list in the background. */
  ngOnInit() { this.recipes.list().then(); }

}
