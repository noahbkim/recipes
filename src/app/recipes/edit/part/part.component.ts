import { Component, Input, AfterViewInit, OnInit, ViewChild } from '@angular/core';

import { Part } from '../../../api/recipe';
import { Item } from '../../../api/item';
import { IngredientService } from '../../../api/ingredient.service';
import { ListEditDelegate } from "../../../library/list";


@Component({
  selector: 'app-part-editor',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartEditorComponent implements OnInit, AfterViewInit {

  @Input() part: Part;
  @Input() index: number;
  @Input() delegate: ListEditDelegate;

  public ingredientName = '';

  searchItems: Item[];
  searchItemIndex: number;
  validItem = false;

  static focus: boolean = false;

  @ViewChild('add') addElement;
  @ViewChild('remove') removeElement;
  @ViewChild('amount') amountElement;
  @ViewChild('ingredient') ingredientElement;

  /** Custom constructor. */
  constructor(private ingredients: IngredientService) {
    ingredients.list().then();
  }

  ngOnInit() {
    this.validItem = this.part.ingredient.id !== '';
    this.ingredientName = this.part.ingredient ? this.part.ingredient.name : '';
  }

  ngAfterViewInit() {
    this.addElement.nativeElement.addEventListener('click', () => this.addAfter());
    if (this.removeElement)
      this.removeElement.nativeElement.addEventListener('click', () => this.delegate.remove(this.index));
    this.ingredientElement.nativeElement.addEventListener('focus', () => this.updateSearch());
    this.ingredientElement.nativeElement.addEventListener('input', () => this.updateSearch(true));
    this.ingredientElement.nativeElement.addEventListener('blur', () => this.clearSearch());
    if (PartEditorComponent.focus) {
      setTimeout(() => this.amountElement.nativeElement.focus(), 1);
      PartEditorComponent.focus = false;
    }
  }

  updateSearch(invalid = false) {
    if (invalid) { this.validItem = false;}
    if (this.validItem) { return; }
    this.searchItems = [];
    for (const ingredient of this.ingredients.cache) {
      if (ingredient.name === this.ingredientName) {
        this.setIngredient(ingredient);
      } else if (this.searchItems.length < 3 && ingredient.name.indexOf(this.ingredientName) > -1) {
        this.searchItems.push(ingredient);
      }
    }
  }

  clearSearch() {
    setTimeout(() => this.searchItems = [], 1);
  }

  setIngredient(ingredient) {
    this.part.ingredient = ingredient;
    this.validItem = true;
    this.ingredientName = ingredient.name;
    this.clearSearch();
  }

  addAfter() {
    this.delegate.add(new Part(), this.index + 1);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      PartEditorComponent.focus = true;
      this.addAfter();
    }
  }

}
