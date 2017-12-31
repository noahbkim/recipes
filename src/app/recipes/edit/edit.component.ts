import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../../api/item';
import { IngredientService } from '../../api/ingredient.service';

import { ElementController, warn } from '../../convenience';


/** Auto complete controller. */
export class AutoCompleteController {

  input: Element;
  dropdown: Element;
  options = Array<Item>();

  constructor(input: Element, dropdown: Element, options: Array<Item>) {
    this.input = input;
    this.dropdown = dropdown;
    this.options = options;
    this.input.addEventListener('activate', () => {

    });
  }

  hide() {
    this.dropdown.classList.add('hidden');
  }

  show() {
    this.dropdown.classList.remove('hidden');
  }

}

/** Control an entry for an ingredient. */
class IngredientController extends ElementController {
  constructor(element: Element, options: Array<Item>) {
    super(element);
    const ingredientInput = element.getElementsByClassName('ingredient')[0];
    const dropdownElement = document.getElementById('ingredients-dropdown');
    const autoComplete = new AutoCompleteController(ingredientInput, dropdownElement, options);
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
  ingredientList: Array<Item>;
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
    this.ingredients.list().then(value => {
      this.ingredientList = value;
      this.ingredientControllers.push(new IngredientController(ingredientTemplate, value));
    }, warn());
    this.stepControllers.push(new StepController(stepTemplate));
  }

  save(andNew) {}

  /** Add a new ingredient. */
  addIngredient() {

  }

}
