import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Recipe } from './recipe';
import { Ingredient } from './ingredient';
import { API } from '../../variables';


@Injectable()
export class RecipeService {

  constructor(private http: Http) { }

  list(): Promise<Recipe> {
    return new Promise((resolve, reject) => {
      this.http.get(API + '/recipes').forEach((res: Response) => {
        try {
          resolve(res.json().map(values => new Recipe(values)));
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  get(id) {}

  create(data) {}

  set(id, data) {}

}
