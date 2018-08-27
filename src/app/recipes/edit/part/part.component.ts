import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';

import { Part } from '../../../api/recipe';
import { Item } from '../../../api/item';
import { IngredientService } from '../../../api/ingredient.service';


@Component({
  selector: 'app-part-editor',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartEditorComponent implements AfterViewInit {

  @Input() part: Part;
  @Input() add: (index: number, values: Object) => null;
  @Input() index: number;

  ingredientName = '';
  ingredientsList: Item[] = [];
  searchItems: Item[];
  validItem = false;

  @ViewChild('add') addElement;
  @ViewChild('delete') deleteElement;
  @ViewChild('ingredient') ingredientElement;

  /** Custom constructor. */
  constructor(private ingredients: IngredientService) {
    ingredients.list(true).then(data => this.ingredientsList = data);
  }

  ngAfterViewInit() {
    this.addElement.nativeElement.addEventListener('click', () => this.add(this.index + 1, new Part()));
    this.ingredientElement.nativeElement.addEventListener('focus', () => this.updateSearch());
    this.ingredientElement.nativeElement.addEventListener('input', () => {
      this.validItem = false;
      this.updateSearch();
    });
    this.ingredientElement.nativeElement.addEventListener('blur', () => {
      setTimeout(() => this.searchItems = [], 50);
    });
  }

  updateSearch() {
    if (this.validItem) { return; }
    this.searchItems = [];
    for (const ingredient of this.ingredientsList) {
      if (ingredient.name === this.ingredientName) {
        this.setIngredient(ingredient);
        return;
      }
      if (this.searchItems.length < 3 && ingredient.name.indexOf(this.ingredientName) > -1) {
        this.searchItems.push(ingredient);
      }
    }
  }

  setIngredient(ingredient) {
    this.part.ingredient = ingredient;
    this.validItem = true;
    this.ingredientElement.nativeElement.value = this.part.ingredient.name;
    this.searchItems = [];
    console.log(this.searchItems);
  }

}
