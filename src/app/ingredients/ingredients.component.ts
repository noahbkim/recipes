import { Component, OnInit } from '@angular/core';

import { IngredientService } from '../api/ingredient.service';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {

  constructor(public ingredients: IngredientService) {}

  /** Update the list in the background. */
  ngOnInit() { this.ingredients.list().then(); }

}
