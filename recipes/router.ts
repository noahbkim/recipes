import { Router } from 'express';
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

const ERROR = {
  DATABASE: 'database error',
  AUTHENTICATION: 'not authenticated'
};

const DEBUG = true;


/** Login and logout routes with obfuscation. */
router.route('/session')

  /** Check whether or not any users exist to authenticate as. */
  .get((request: Request, response: Response) => {
    UserModel.countDocuments().then(count => {
      response.status(count === 0 ? 403 : 200).json({});
    }).catch( error => {
      response.status(500).json({error: DEBUG ? error : ERROR.DATABASE});
    });
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
      (UserModel as any).fromJSON(request.body).then(user => {
        user.save().then(() => {
          response.json(user.toJSON());
        }).catch(error => {
          if (DEBUG) console.error(error);
          response.status(500).json({error: ERROR.DATABASE});
        });
      }).catch(error => {
        response.status(400).json({error});
      });
    };
    if (response.user) create();
    else UserModel.countDocuments().then(count => {
      if (count === 0) create();
      else response.status(401).json({error: ERROR.AUTHENTICATION});
    }).catch(error => {
      if (DEBUG) console.error(error);
      response.status(500).json({error: ERROR.DATABASE});
    });
  });


/** Get all recipes or post a new recipe. */
router.route('/recipes')

  /** When a user requests a recipe, return the JSON dump. */
  .get((request: Request, response: Response) => {
    RecipeModel.find().exec().then((recipes: Array<Recipe>) => {
      response.json(recipes.map(recipe => recipe.toJSON({preview: true})));
    }).catch(error => {
      if (DEBUG) console.error(error);
      response.status(500).json({error: ERROR.DATABASE});
    });
  })

  /** Validate and return the recipe. */
  .post(authenticate, (request: Request, response: Response) => {
    let recipe: Recipe;
    try {
      recipe = (RecipeModel as any).fromJSON(request.body);
    } catch (error) {
      response.status(400).json({error});
      return;
    }
    recipe.save().then(() => {
      return (EditedModel as any).update('recipes');
    }).then(() => {
      response.json(recipe.toJSON({preview: true}));
    }).catch( error => {
      if (DEBUG) console.error(error);
      response.status(500).json({error: ERROR.DATABASE});
    });
  });


/** Check the last edited time of the recipes list. */
router.route('/recipes/edited')
  .get((request: Request, response: Response) => {
    (EditedModel as any).get('recipes').then((edited: Edited) => {
      return response.json(edited.toJSON());
    }).catch(error => {
      if (DEBUG) console.error(error);
      response.json({error: ERROR.DATABASE});
    });
  });


/** Get, edit, or delete a specific recipe. */
router.route('/recipes/:id')

  /** Get a specific recipe. */
  .get((request: Request, response: Response) => {
    RecipeModel.findById(request.params.id).then(recipe => {
      if (recipe) response.json(recipe.toJSON());
      else response.status(404).json({});
    }).catch(error => {
      if (DEBUG) console.error(error);
      response.status(500).json({error: ERROR.DATABASE});
    });
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
    IngredientModel.find().exec().then((ingredients: Array<Ingredient>) => {
      response.json(ingredients.map(ingredient => ingredient.toJSON()));
    }).catch(error => {
      if (DEBUG) console.error(error);
      response.status(400).json({error: ERROR.DATABASE});
    });
  })

  /** Create a new ingredient. */
  .post(authenticate, (request: Request, response: Response) => {
    let ingredient: Ingredient;
    try {
      ingredient = (IngredientModel as any).fromJSON(request.body);
    } catch (error) {
      response.status(400).json({error});
      return;
    }
    ingredient.save().then(() => {
      return (EditedModel as any).update('ingredients');
    }).then(() => {
      response.json(ingredient.toJSON());
    }).catch( error => {
      if (DEBUG) console.error(error);
      response.status(500).json({error: ERROR.DATABASE});
    });
  });

/** Get, edit, or delete a specific recipe. */
router.route('/ingredients/:id')

  /** Get a specific recipe. */
  .get((request: Request, response: Response) => {
    IngredientModel.findById(request.params.id).then(ingredient => {
      if (ingredient) response.json(ingredient.toJSON());
      else response.status(404).json({});
    }).catch(error => {
      if (DEBUG) console.error(error);
      response.status(500).json({error: ERROR.DATABASE});
    });
  })

  .post((request: Request, response: Response) => {
    IngredientModel.findById(request.params.id).then(ingredient => {
      if (!ingredient) response.status(404).json({});
      try {
        ingredient.updateFromJSON(request.body);
      } catch (error) {
        response.status(400).json({error});
        return;
      }
      return ingredient.save().then(() => {
        return (EditedModel as any).update('ingredients');
      }).then(() => {
        response.json(ingredient.toJSON());
      }).catch(error => {
        if (DEBUG) console.error(error);
        response.status(500).json({error: ERROR.DATABASE});
      });
    });
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
