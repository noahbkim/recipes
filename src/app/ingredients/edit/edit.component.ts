import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ingredient } from '../../api/ingredient';
import { IngredientService } from '../../api/ingredient.service';

import { warn } from '../../convenience';


@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class IngredientEditComponent implements OnInit {

  /** Construct with an ingredients service access. */
  constructor(public ingredients: IngredientService, private router: Router, private route: ActivatedRoute) {}

  /** Called when the component is initialized. */
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.ingredients.local.id = params.id;
        this.ingredients.get(params.id).then(ingredient => {
          this.ingredients.local = ingredient;
        }, warn());
      }
    });
  }

  /** Save the ingredient. */
  save(andNew = false) {
    this.ingredients.updateOrCreate(this.ingredients.local.id, this.ingredients.local.toJSON()).then(data => {
      this.ingredients.local = new Ingredient();
      if (!andNew) { this.router.navigate(['/ingredients/' + data]).then(); }
    }, warn());
  }

  /** Delete the ingredient. */
  delete() {
    if (this.ingredients.local.id !== null) {
      this.ingredients.delete(this.ingredients.local.id).then(() => {
        this.router.navigate(['/ingredients']);
      }, warn());
    }
  }

}
