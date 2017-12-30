import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IngredientService } from '../../api/ingredient.service';

import { warn } from '../../convenience';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class IngredientEditComponent implements OnInit {

  /** Ingredient ID. */
  id: String;
  form: Element;

  /** Construct with an ingredients service access. */
  constructor(private ingredients: IngredientService, private router: Router, private route: ActivatedRoute) {}

  /** Called when the component is initialized. */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.form = document.forms['ingredient'];
      if (params.id) {
        this.id = params.id;
        this.ingredients.get(params.id).then(ingredient => {
          this.form['name'].value = ingredient.name;
          this.form['description'].value = ingredient.description;
        }, warn());
      }
    });
  }

  /** Save the ingredient. */
  save(andNew = false) {
    const value = {
      name: this.form['name'].value,
      description: this.form['description'].value
    };
    let promise;
    if (this.id) {
      promise = this.ingredients.update(this.id, value);
    } else {
      promise = this.ingredients.create(value);
    }
    promise.then(data => {
      if (andNew) {
        this.router.navigate(['/ingredients/new']);
      } else {
        this.router.navigate(['/ingredients/' + data]);
      }
    }, warn());
  }

}
