import { Router } from 'express';
import { Request, Response } from 'passport-local-mongoose';
import * as passport from 'passport';

import { User, UserModel } from './models/user';
import { Ingredient, IngredientModel } from './models/ingredient';
import { Recipe, RecipeModel } from './models/recipe';


const router = Router();

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

