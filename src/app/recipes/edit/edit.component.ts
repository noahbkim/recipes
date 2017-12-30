import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IngredientService } from '../../api/ingredient.service';

import { ElementController } from '../../convenience';


/** Control an entry for an ingredient. */
class IngredientController extends ElementController {
  constructor(element: Element) {
    super(element);
    const ingredientInput = element.getElementsByClassName('ingredient');

  }
}

/** Control an entry for a recipe step. */
class StepController extends ElementController {
}


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  ingredientTemplate: String;
  stepTemplate: String;
  ingredientControllers = Array<IngredientController>();
  stepControllers = Array<StepController>();

  /** Construct with an ingredients service access. */
  constructor(private ingredients: IngredientService, private router: Router, private route: ActivatedRoute) {}

  /** Called when the component is initialized. */
  ngOnInit() {
    const ingredientTemplate = document.getElementById('ingredients');
    IngredientController.template = ingredientTemplate.innerHTML;
    const stepTemplate = document.getElementById('steps');
    StepController.template = stepTemplate.innerHTML;
    this.ingredientControllers.push(new IngredientController(ingredientTemplate));
    this.stepControllers.push(new StepController(stepTemplate));
  }

  save(andNew) {}

  /** Add a new ingredient. */
  addIngredient() {

  }

}
