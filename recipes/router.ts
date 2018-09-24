import { Router } from 'express';
import { Error } from 'mongoose';
import { Request, Response } from 'passport-local-mongoose';
import * as passport from 'passport';

import { User, UserModel } from './models/user';
import { Edited, EditedModel } from './models/edited';
import { Ingredient, IngredientModel } from './models/ingredient';
import { Recipe, RecipeModel } from './models/recipe';

import { asNotEmpty, asOptionalString, asString } from './validators';


export const router = Router();

function authenticate(request: Request, response: Response, next: Function): void {
  if (request.user) next();
  else response.json({error: 'not authenticated'});
}


/** Respond to a login POST request. */
router.route('/user/login')
  .post(passport.authenticate('local'), (request: Request, response: Response) => {
    console.log('Login!');
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
    RecipeModel.find().exec().then(
      (recipes: Array<Recipe>) => response.json(recipes.map(recipe => recipe.toJSON({preview: true}))),
      (error: Error) => response.status(400).json({error: error.message}));
  })

  /** Validate and return the recipe. */
  .post(authenticate, (request: Request, response: Response) => {
    let recipe: Recipe;
    try {
      recipe = (RecipeModel as any).fromJSON(request.body);
    } catch (error) { return response.json({error}); }
    recipe.save().then(() => {
      response.json({id: recipe.id});
      (EditedModel as any).update('recipes');
    }, (error: Error) => response.json({error}));
  });


/** Check the last edited time of the recipes list. */
router.route('/recipes/edited')
  .get((request: Request, response: Response) => {
    (EditedModel as any).get('recipes').then(
      (edited: Edited) => response.json(edited.toJSON()),
      (error: Error) => response.json({error})
    );
  });


router.route('/ingredients')

  /** Return the JSON dump of all ingredients. */
  .get((request: Request, response: Response) => {

  });

/*

/recipes
  GET list of recipes
  POST new recipe

/recipes/:id
  GET a recipe
  POST edit a recipe
  DELETE delete a recipe

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
