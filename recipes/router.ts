import { Router } from 'express';
import { Error } from 'mongoose';
import { Request, Response } from 'passport-local-mongoose';
import * as passport from 'passport';

import { User, UserModel } from './models/user';
import { Edited, EditedModel } from './models/edited';
import { Ingredient, IngredientModel } from './models/ingredient';
import { Recipe, RecipeModel } from './models/recipe';


export const router = Router();

function authenticate(request: Request, response: Response, next: Function): void {
  if (request.user) next();
  else response.json({error: 'not authenticated'});
}


/** Respond to a login POST request. */
router.route('/user/login')
  .post(passport.authenticate('local'), (request: Request, response: Response) => {
    response.json(request.user.toJSON());
  });

/** Logout a user. */
router.route('/user/logout')
  .post(authenticate, (request: Request, response: Response) => {
    request.logout().then(() => response.send({}));
  });

/** Get information about the user. */
router.route('/user')
  .get(authenticate, (request: Request, response: Response) => {
    response.json(request.user.toJSON());
  });


router.route('/recipes')

  /** When a user requests a recipe, return the JSON dump. */
  .get((request: Request, response: Response) => {
    RecipeModel.find().sort({name: 1}).exec((error: Error, recipes: Array<Recipe>) => {
      if (error)
        return response.status(400).json({error: error.message});
      response.json(recipes.map(recipe => recipe.toJSON({preview: true})));
    });
  })

  .post(authenticate, (request: Request, response: Response) => {

  });


/*

/recipes
  /:id
  /edit
    /:id

/ingredients
  /:id
  /edit
    /:id

/inventories
  /:id
    /recipes

/menus
  /:id
  /edit
    /:id
  /share

*/
