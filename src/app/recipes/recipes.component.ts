import { Component, OnInit } from '@angular/core';

import { Item } from '../api/item';
import { RecipeService } from '../api/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  /** The list of loaded recipes. */
  items: Array<Item> = Array<Item>();

  /** Construct with an ingredients service access. */
  constructor(private recipes: RecipeService) {}

  /** Called on initialization of the component. */
  ngOnInit() {
    this.recipes.list().then(data => {
      this.items = data;
    });
  }

}
