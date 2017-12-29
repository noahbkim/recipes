import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API } from '../../variables';

import { Ingredient } from './ingredient';


@Injectable()
export class IngredientService {

  constructor(private http: Http) {}

  list(): Promise<Ingredient> {
    return new Promise(() => {});
  }

}
