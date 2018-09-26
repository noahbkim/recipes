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
  else response.status(401).json({error: 'not authenticated'});
}


/** Login and logout routes with obfuscation. */
router.route('/authenticate')

  /** Check whether or not any users exist to authenticate as. */
  .get((request: Request, response: Response) => {
    UserModel.count({}).then(count => {
      response.status(count === 0 ? 403 : 200).json({});
    }, response.status(400).json({error: 'database error'}));
  })

  /** Login and create a session. */
  .post(passport.authenticate('local'), (request: Request, response: Response) => {
    response.json(request.user.toJSON());
  })

  /** Logout and delete the session. */
  .delete(authenticate, (request: Request, response: Response) => {
    request.logout().then(() => response.send({}));
  });


/** Get information about the user. */
router.route('/user')

  /** Get information about the user. */
  .get(authenticate, (request: Request, response: Response) => {
    response.json(request.user.toJSON());
  })

  /** Create a user, allow anyone to create a user if there are none in the database. */
  .post((request: Request, response: Response) => {
    const create = () => {
      const user = (UserModel as any).fromJSON(request.body);
      user.save();
      response.json(user.toJSON());
    };
    if (response.user) create();
    else UserModel.count({}).then(count => {
      if (count === 0)
        create();
      else response.status(401).json({error: 'not authenticated'});
    });
  });


/** Get all recipes or post a new recipe. */
router.route('/recipes')

  /** When a user requests a recipe, return the JSON dump. */
  .get((request: Request, response: Response) => {
    RecipeModel.find().exec().then(
      (recipes: Array<Recipe>) => response.json(
        recipes.map(recipe => recipe.toJSON({preview: true}))),
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


/** Get, edit, or delete a specific recipe. */
router.route('/recipes/:id')

  /** Get a specific recipe. */
  .get((request: Request, response: Response) => {

  })

  /** Edit a specific recipe. */
  .post(authenticate, (request: Request, response: Response) => {

  })

  /** Delete a recipe. */
  .delete(authenticate, (request: Request, response: Response) => {

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
