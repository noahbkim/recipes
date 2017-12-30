import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Item } from './item';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';
import { API } from '../../variables';


@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

  list(): Promise<Array<Item>> {
    return new Promise((resolve, reject) => {
      this.http.get(API + '/recipes').subscribe((data) => {
        const items = [];
        for (const values of data as Array<{}>) { items.push(new Item(values)); }
        resolve(items);
      }, (error) => {
        console.warn('Error! ' + error.message);
        reject();
      });
    });
  }

  get(id) {}

  create(data) {}

  set(id, data) {}

}
