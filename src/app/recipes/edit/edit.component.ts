import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IngredientService } from '../../api/ingredient.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  ingredientTemplate: String;
  stepTemplate: String;

  /** Construct with an ingredients service access. */
  constructor(private ingredients: IngredientService, private router: Router, private route: ActivatedRoute) {}

  /** Called when the component is initialized. */
  ngOnInit() {
    this.ingredientTemplate = document.getElementById('ingredients').innerHTML;
    this.stepTemplate = document.getElementById('steps').innerHTML;
  }

  save(andNew) {}

}
