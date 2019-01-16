import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../../api/item';
import { IngredientService } from '../../api/ingredient.service';
import { Recipe, Part, Step } from '../../api/recipe';
import { RecipeService } from '../../api/recipe.service';

import { warn } from '../../convenience';
import {ListEditDelegate} from "../../library/list";


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

  /** Editing delegates for passing to list elements. */
  partsDelegate: ListEditDelegate;
  stepsDelegate: ListEditDelegate;

  /** Construct with an ingredients service access. */
  constructor(
    private ingredients: IngredientService,
    public recipes: RecipeService,
    private router: Router,
    private route: ActivatedRoute) {}

  /** Called when the component is initialized. */
  public ngOnInit() {
    this.bind();
    this.form = document.forms['recipe'];
    this.ingredients.list().then(ingredients => {
      this.ingredientList = ingredients;
      this.route.params.subscribe(params => {
        if (params.id) {
          this.id = params.id;
          this.recipes.get(params.id).then(recipe => this.recipes.local = recipe, warn());
        } else {
          if (this.recipes.local.parts.length === 0)
            this.recipes.local.parts.push(new Part());
          if (this.recipes.local.steps.length === 0)
            this.recipes.local.steps.push(new Step());
        }
      });
    });
  }

  public save(andNew) {
    this.recipes.updateOrCreate(this.recipes.local.id, this.recipes.local.toJSON()).then(item => {
      this.recipes.local = new Recipe();
      this.bind();
      this.recipes.list().then();
      if (!andNew) { this.router.navigate(['recipes', item.id]).then(); }
    }).catch(warn());
  }

  /** Delete the ingredient. */
  public delete() {
    if (this.recipes.local.id !== null) {
      this.recipes.delete(this.recipes.local.id).then(() => {
        this.recipes.local = new Recipe();
        this.bind();
        this.router.navigate(['recipes']).then();
      }).catch(warn());
    }
  }

  private bind() {
    this.partsDelegate = new ListEditDelegate(this.recipes.local.parts);
    this.stepsDelegate = new ListEditDelegate(this.recipes.local.steps);
  }

}
