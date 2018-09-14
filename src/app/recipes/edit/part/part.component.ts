import { Component, Input, AfterViewInit, OnInit, ViewChild } from '@angular/core';

import { Part } from '../../../api/recipe';
import { Item } from '../../../api/item';
import { IngredientService } from '../../../api/ingredient.service';


@Component({
  selector: 'app-part-editor',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartEditorComponent implements OnInit, AfterViewInit {

  @Input() part: Part;
  @Input() add: (index: number, object: any) => null;
  @Input() remove: (index: number) => null;
  @Input() index: number;

  public ingredientName = '';

  ingredientsList: Item[] = [];
  searchItems: Item[];
  validItem = false;

  @ViewChild('add') addElement;
  @ViewChild('remove') removeElement;
  @ViewChild('ingredient') ingredientElement;

  /** Custom constructor. */
  constructor(private ingredients: IngredientService) {
    ingredients.list(true).then(data => this.ingredientsList = data);
  }

  ngOnInit() {
    this.validItem = this.part.id !== '';
    this.ingredientName = this.part.ingredient ? this.part.ingredient.name : '';
  }

  ngAfterViewInit() {
    this.addElement.nativeElement.addEventListener('click', () => this.add(this.index + 1, new Part()));
    if (this.removeElement) { this.removeElement.nativeElement.addEventListener('click', () => this.remove(this.index)); }
    this.ingredientElement.nativeElement.addEventListener('focus', () => this.updateSearch());
    this.ingredientElement.nativeElement.addEventListener('input', () => this.updateSearch(true));
    this.ingredientElement.nativeElement.addEventListener('blur', () => this.clearSearch());
  }

  updateSearch(invalid = false) {
    if (invalid) { this.validItem = false;}
    if (this.validItem) { return; }
    this.searchItems = [];
    for (const ingredient of this.ingredientsList) {
      if (ingredient.name === this.ingredientName) {
        this.setIngredient(ingredient);
      } else if (this.searchItems.length < 3 && ingredient.name.indexOf(this.ingredientName) > -1) {
        this.searchItems.push(ingredient);
      }
    }
  }

  clearSearch() {
    setTimeout(() => this.searchItems = [], 500);
  }

  setIngredient(ingredient) {
    console.log(ingredient);
    this.part.id = ingredient.id;
    this.part.ingredient = ingredient;
    this.validItem = true;
    this.ingredientName = ingredient.name;
    this.clearSearch();
  }

}
