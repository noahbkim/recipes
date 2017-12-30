import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../../api/recipe';
import { RecipeService } from '../../api/recipe.service';

import { warn } from '../../convenience';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class RecipeViewComponent implements OnInit {

  /** Recipe object. */
  recipe: Recipe;

  /** Construct with an ingredients service access. */
  constructor(private recipes: RecipeService, private route: ActivatedRoute) {}

  /** Called when the component is initialized. */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipes.get(params.id).then(value => {
        this.recipe = value;
      }, warn());
    });
  }

}
