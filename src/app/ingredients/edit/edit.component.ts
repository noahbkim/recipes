import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ingredient } from '../../api/ingredient';
import { IngredientService } from '../../api/ingredient.service';

import { warn } from '../../convenience';
import {Recipe} from "../../api/recipe";


@Component({
  selector: 'ingredient-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class IngredientEditComponent implements OnInit {

  constructor(public ingredients: IngredientService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.ingredients.local.id = params.id;
        return this.ingredients.get(params.id).then(ingredient => {
          this.ingredients.local = ingredient;
        }, warn());
      }
    });
  }

  /** Save the ingredient. */
  save(andNew = false) {
    this.ingredients.updateOrCreate(this.ingredients.local.id, this.ingredients.local.toJSON()).then(item => {
      this.ingredients.local = new Ingredient();
      this.ingredients.list().then();
      if (!andNew) { return this.router.navigate(['/ingredients/' + item.id]); }
    }).catch(warn);
  }

  /** Delete the ingredient. */
  delete() {
    if (this.ingredients.local.id !== null) {
      this.ingredients.delete(this.ingredients.local.id).then(() => {
        this.ingredients.local = new Ingredient();
        return this.router.navigate(['/ingredients']);
      }).catch(warn);
    }
  }

}
