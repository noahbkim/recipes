import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientEditorComponent implements OnInit {

  amount: String;
  ingredient: String;

  /** Custom constructor. */
  constructor(amount: String = '', ingredient: String = '') {
    this.amount = amount;
    this.ingredient = ingredient;
  }

  ngOnInit() {
  }

}
