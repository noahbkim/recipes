import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Ingredient } from '../../api/ingredient';
import { IngredientService } from '../../api/ingredient.service';

import { warn } from '../../convenience';


@Component({
  selector: 'app-ingredient-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class IngredientViewComponent implements OnInit {

  ingredient: Ingredient;

  constructor(private ingredients: IngredientService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ingredients.get(params.id).then(ingredient => {
        this.ingredient = ingredient;
      }, warn());
    });
  }

}
