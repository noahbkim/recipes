import { Component, OnInit } from '@angular/core';

import { Item } from '../api/item';
import { IngredientService } from '../api/ingredient.service';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {

  /** The list of loaded recipes. */
  items: Array<Item> = Array<Item>();

  /** Construct with an ingredients service access. */
  constructor(private ingredients: IngredientService) {}

  /** Called on initialization of the component. */
  ngOnInit() {
    this.ingredients.list().then(data => {
      this.items = data;
    });
  }

}
