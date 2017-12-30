import { Component } from '@angular/core';

const RECIPES: String = 'Recipes';
const INGREDIENTS: String = 'Ingredients';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: String = 'Recipes';
}
