import { Component, OnInit } from '@angular/core';

import { IngredientService } from '../api/ingredient.service';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {

  /** Construct with an ingredients service access. */
  constructor(public ingredients: IngredientService) {}

  /** Called on initialization of the component. */
  ngOnInit() {
    this.ingredients.list().then();
  }

}
