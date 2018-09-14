import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../../api/item';
import { IngredientService } from '../../api/ingredient.service';
import { Recipe, Part, Step } from '../../api/recipe';
import { RecipeService } from '../../api/recipe.service';

import { warn } from '../../convenience';
import {Ingredient} from '../../api/ingredient';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  /** Ingredient ID. */
  id: string;
  form: Element;
  ingredientList: Item[] = [];

  /** Construct with an ingredients service access. */
  constructor(
    private ingredients: IngredientService,
    public recipes: RecipeService,
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
          this.recipes.get(params.id).then(recipe => this.recipes.local = recipe, warn());
        } else {
          if (this.recipes.local.parts.length === 0) {
            this.recipes.local.parts.push(new Part());
          }
          if (this.recipes.local.steps.length === 0) {
            this.recipes.local.steps.push(new Step());
          }
        }
      });
    });
  }

  save(andNew) {
    this.recipes.updateOrCreate(this.recipes.local.id, this.recipes.local.toJSON()).then(data => {
      this.recipes.local = new Recipe();
      this.recipes.list();
      if (!andNew) { this.router.navigate(['recipes', data]).then(); }
    });
  }

  /** Delete the ingredient. */
  delete() {
    if (this.recipes.local.id !== null) {
      this.recipes.delete(this.recipes.local.id).then(() => {
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
