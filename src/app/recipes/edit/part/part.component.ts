import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';

import { Part } from '../../../api/recipe';
import { Item } from '../../../api/item';
import { IngredientService } from '../../../api/ingredient.service';


@Component({
  selector: 'app-part-editor',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartEditorComponent implements OnInit, AfterViewInit {

  @Input() amount: string;
  @Input() ingredient: string;
  @Input() add: (index: number, values: Object) => null;
  @Input() index: number;

  id: string = null;

  ingredientsList: Item[];

  @ViewChild('add') addElement;
  @ViewChild('delete') deleteElement;
  @ViewChild('ingredient') ingredientElement;

  searchItems: string[];

  /** Custom constructor. */
  constructor(private ingredients: IngredientService) {
    ingredients.list().then(data => this.ingredientsList = data);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.addElement.nativeElement.addEventListener('click', () => this.add(this.index + 1, new Part()));
    this.ingredientElement.nativeElement.addEventListener('focus', () => this.updateSearch());
    this.ingredientElement.nativeElement.addEventListener('input', () => this.updateSearch());
  }

  updateSearch() {
    let i = 0;
    this.searchItems = [];
    for (const ingredient of this.ingredientsList) {
      if (ingredient.name.indexOf(this.ingredient) > -1) {
        this.searchItems.push(ingredient.name);
        i++;
      }
      if (i > 3) { break; }
    }
    console.log(this.searchItems);
  }

}
