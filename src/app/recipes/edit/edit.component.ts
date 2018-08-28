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
          this.recipes.get(params.id).then(recipe => this.recipe = recipe, warn());
        } else {
          this.recipe = new Recipe();
          this.recipe.parts.push(new Part());
          this.recipe.steps.push(new Step());
        }
      });
    });
  }

  save(andNew) {
    this.recipes.updateOrCreate(this.recipe.id, this.recipe.toJSON()).then(data => {
      if (!andNew) { this.router.navigate(['recipes', data]).then(); }
    });
  }

  /** Delete the ingredient. */
  delete() {
    if (this.recipe.id !== null) {
      this.recipes.delete(this.recipe.id).then(() => {
        this.router.navigate(['recipes']).then();
      }, warn());
    }
  }

  makeAdd(list: any[]) {
    return (index: number = null, object: any) => {
      if (index === null) { index = list.length; }
      list.splice(index, 0, object);
    };
  }

  makeRemove(list: any[]) {
    return (index: number) => list.splice(index, 1);
  }

}
