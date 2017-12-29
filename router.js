const express = require("express");
const Recipe = require("./recipe.js");

const router = express.Router();


router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.route("/recipes")
  
  /* Get an overview of the recipes. */
  .get((req, res) => {
    Recipe.find((err, recipes) => {
      if (err) { res.status(400).json({error: err.message}); }
      else {
        let data = [];
        for (let recipe of recipes)
          data.push({id: recipe.id, title: recipe.title});
        res.json(data);
      }
    })
  })
  
  /* Create a recipe. */
  .post((req, res) => {

    /* Check recipe ID. */
    if (recipe.id.length === 0) {
      res.status(400).json({error: "Recipe ID may not be empty"});
      return;
    }

    /* Search for an existing recipe. */
    Recipe.findById(req.body.id, (err, recipe) => {
    
      /* Check error. */
      res.status(400).json({error: err.message});
    
      /* If the recipe doesn't exist, create a new one. */
      if (recipe === null) recipe = new Recipe();
      
      /* Modify the recipe details. */
      recipe.name = req.body.name;
      recipe.description = req.body.description;
      recipe.ingredients = req.body.ingredients;
      recipe.steps = req.body.steps;
      recipe.notes = req.body.notes;
      recipe.starred = req.body.starred;
      
      /* Save the model. */
      recipe.save((err) => {
        if (err) res.status(400).json({error: err.message}); 
      });
      
    });
  })
  
router.route("/recipes/:id")

  /* Get a single recipe by ID. */
  .get((req, res) => {
    Recipe.findById(req.body.id, (err, recipe) => {
      if (err) { 
        res.status(400).json({error: err.message});
        return;
      }
      res.json(recipe);
    });
  })
  
module.exports = router;
