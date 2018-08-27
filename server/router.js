const express = require("express");
const models = require("./models.js");

const router = express.Router({});


/** Generic route for listing recipes. */
router.route("/recipes")
  
  /** Get an overview of the recipes. */
  .get((req, res) => {
    models.Recipe.find().sort({name: 1}).exec((err, recipes) => {
      if (err) { res.status(400).json({error: err.message}); }
      else {
        let data = [];
        for (let recipe of recipes)
          data.push({
            id: recipe.id, 
            name: recipe.name,
            //description: recipe.description
          });
        res.json(data);
      }
    })
  })
  
  /** Create a recipe. */
  .post((req, res) => {
    let recipe = new models.Recipe();
    recipe.updateFromRequest(req);
    recipe.save((err) => { 
      if (err) {
        res.status(400).json({error: err.message}); 
        return;
      }
      res.json({id: recipe.id});
    });
  });


/** Specific recipe ID route. */
router.route("/recipes/:id")

  /** Get a single recipe by ID. */
  .get((req, res) => {
    models.Recipe.findById(req.params.id, (err, recipe) => {
      if (err) { res.status(400).json({error: err.message}); return; }
      res.json(recipe.toJSON());
    });
  })
  
  /** Edit a single recipe ID. */
  .post((req, res) => {
    models.Recipe.findById(req.params.id, (err, recipe) => {
      if (err) { res.status(400).json({error: err.message}); return; }
      if (recipe === null) { res.status(400).json({error: "No such recipe"}); return; }
      recipe.updateFromRequest(req);
      recipe.save((err) => {
        if (err) { res.status(400).json({error: err.message}); return; }
        res.json({id: recipe.id});
      });
    });
  })
  
  .delete((req, res) => {
    models.Recipe.remove({ id: req.params.id }, (err) => {
      if (err) { res.status(400).json({error: err.message}); return; }
      res.json({});
    });
  });


router.route("/ingredients")

  /** Get the list of ingredients. */
  .get((req, res) => {
    models.Ingredient.find().sort({name: 1}).exec((err, ingredients) => {
      if (err) { res.status(400).json({error: err.message}); }
      else {
        let data = [];
        for (let ingredient of ingredients)
          data.push(ingredient.toJSON());
        res.json(data);
      }
    });
  })

  /** Create an ingredient. */
  .post((req, res) => {
    let ingredient = new models.Ingredient();
    ingredient.updateFromRequest(req);
    ingredient.save((err) => { 
      if (err) { res.status(400).json({error: err.message}); return; }
      res.json({id: ingredient.id});
    });
  });
  
/** Specific recipe ID route. */
router.route("/ingredients/:id")

  /** Get a single recipe by ID. */
  .get((req, res) => {
    models.Ingredient.findById(req.params.id, (err, ingredient) => {
      if (err) { res.status(400).json({error: err.message}); return; }
      if (ingredient === null) { res.status(400).json({error: "No such ingredient"}); return; }
      res.json(ingredient.toJSON());
    });
  })
  
  /** Edit a single recipe ID. */
  .post((req, res) => {
    models.Ingredient.findById(req.params.id, (err, ingredient) => {
      if (err) { res.status(400).json({error: err.message}); return; }
      ingredient.updateFromRequest(req);
      ingredient.save((err) => {
        if (err) { res.status(400).json({error: err.message}); return; }
        res.json({id: ingredient.id});
      });
    });
  })

  /** Delete the ingredient. */  
  .delete((req, res) => {
    models.Ingredient.remove({ _id: req.params.id }, (err) => {
      if (err) { res.status(400).json({error: err.message}); return; }
      res.json({});
    });
  });

/** Ingredient routes. */
module.exports = router;
