import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../../api/item';
import { IngredientService } from '../../api/ingredient.service';
import { Recipe, Part, Step } from '../../api/recipe';
import { RecipeService } from '../../api/recipe.service';

import { warn } from '../../convenience';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe = new Recipe();

  /** Ingredient ID. */
  id: string;
  form: Element;
  ingredientList: Item[] = [];

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
          this.recipes.get(params.id).then(recipe => {
            this.recipe = recipe;
            this.populateForm();
          }, warn());
        } else {
          this.recipe = new Recipe();
          this.addIngredient();
          this.addStep();
        }
      });
    });
  }

  /** Populate the form with existing data. */
  populateForm() {

  }

  save(andNew) {
    console.log(this.recipe.toJSON());
    this.recipes.updateOrCreate(this.recipe.id, this.recipe.toJSON()).then(data => {
      if (!andNew) { this.router.navigate(['recipes', data]); }
    });
  }

  /** Add an empty ingredient. */
  addIngredient(index: number = null, values: Object = {}) {
    if (index === null) { index = this.recipe.parts.length; }
    this.recipe.parts.splice(index, 0, new Part(values));
  }

  getAddIngredient() { return this.addIngredient.bind(this); }

  /** Add an empty step. */
  addStep(index: number = null, values: Object = {}) {
    if (index === null) { index = this.recipe.steps.length; }
    this.recipe.steps.splice(index, 0, new Step(values));
  }

  getAddStep() { return this.addStep.bind(this); }

}
