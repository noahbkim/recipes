import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../../api/item';
import { IngredientService } from '../../api/ingredient.service';
import { Recipe, Part } from '../../api/recipe';
import { RecipeService } from '../../api/recipe.service';

import { PartEditorComponent } from './part/part.component';
import { StepEditorComponent } from './step/step.component';

import { warn } from '../../convenience';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  /** Ingredient ID. */
  id: String;
  form: Element;
  ingredientList = Array<Item>();
  parts = Array<Part>();
  steps = Array<String>();

  /** Construct with an ingredients service access. */
  constructor(
    private ingredients: IngredientService,
    private recipes: RecipeService,
    private router: Router,
    private route: ActivatedRoute) {}

  /** Called when the component is initialized. */
  ngOnInit() {
    this.form = document.forms['recipe'];
    this.ingredients.list().then(ingredients => {
      this.ingredientList = ingredients;
      this.route.params.subscribe(params => {
        if (params.id) {
          this.id = params.id;
          this.ingredients.get(params.id).then(this.populateForm.bind(this), warn());
        } else {
          this.addIngredient();
          this.addStep();
        }
      });
    });
  }

  /** Populate the form with existing data. */
  populateForm(recipe: Recipe) {
    this.form['name'].value = recipe.name;
    this.form['description'].value = recipe.description;
  }

  save(andNew) {}

  /** Add an empty ingredient. */
  addIngredient(index = null, values: Object = {}) {
    if (index === null) { index = this.parts.length; }
    this.parts.splice(index, 0, new Part(values));
  }

  /** Add an empty step. */
  addStep(index = null, step: String = '') {
    if (index === null) { index = this.steps.length; }
    this.steps.splice(index, 0, step);
  }

  getAddIngredient() { return this.addIngredient.bind(this); }
  getAddStep() { return this.addStep.bind(this); }

}
