import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../variables';

import { Ingredient } from './ingredient';


@Injectable()
export class IngredientService {

  constructor(private http: HttpClient) {}

  list(): Promise<Ingredient> {
    return new Promise(() => {});
  }

}
