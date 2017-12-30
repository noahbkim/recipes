import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Ingredient } from '../../api/ingredient';
import { IngredientService } from '../../api/ingredient.service';

import { warn } from '../../convenience';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class IngredientViewComponent implements OnInit {

  /** Ingredient object. */
  ingredient: Ingredient;

  /** Construct with an ingredients service access. */
  constructor(private ingredients: IngredientService, private route: ActivatedRoute) {}

  /** Called when the component is initialized. */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ingredients.get(params.id).then(value => {
        this.ingredient = value;
      }, warn());
    });
  }

}
