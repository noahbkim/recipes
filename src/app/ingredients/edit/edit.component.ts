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

  ingredient: Ingredient = new Ingredient();

  /** Construct with an ingredients service access. */
  constructor(private ingredients: IngredientService, private router: Router, private route: ActivatedRoute) {}

  /** Called when the component is initialized. */
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.ingredient.id = params.id;
        this.ingredients.get(params.id).then(ingredient => {
          this.ingredient = ingredient;
        }, warn());
      } else {
        this.ingredient = new Ingredient();
      }
    });
  }

  /** Save the ingredient. */
  save(andNew = false) {
    this.ingredients.updateOrCreate(this.ingredient.id, this.ingredient.toJSON()).then(data => {
      console.log(data);
      if (andNew) {
        this.ingredient = new Ingredient();
      } else {
        this.router.navigate(['/ingredients/' + data]);
      }
    }, warn());
  }

  /** Delete the ingredient. */
  delete() {
    if (this.ingredient.id !== null) {
      this.ingredients.delete(this.ingredient.id).then(() => {
        this.router.navigate(['/ingredients']);
      }, warn());
    }
  }

}
