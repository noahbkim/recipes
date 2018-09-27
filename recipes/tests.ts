import * as request from 'supertest';

import { Server } from './server';
import { Dispatcher } from './library/eventful';


const server = new Server('recipes-test');

before(done => {
  server.initialize(done);
});

after(done => {
  server.flush(() =>
    server.disconnect( () => {
      console.log('shut down server!');
      done();
    }));
});


const USERNAME = 'username';
const PASSWORD = 'password';
const INCORRECT = 'incorrect';

const INGREDIENT = {
  id: undefined,
  name: 'water',
  description: 'the source of organic life on earth'
};

const RECIPE = {
  id: undefined,
  name: 'water',
  description: 'a timeless classic',
  parts: [],
  steps: [{description: 'pour into glass'}],
  notes: 'best served cold',
  tags: ['basic', 'virgin']
};

const NEW_INGREDIENT_DESCRIPTION = 'the dangerous chemical dihydrogen monoxide';
const NEW_RECIPE_DESCRIPTION = 'a drink for only the most daring';


const dispatcher = new Dispatcher();


describe('recipes', () => {
  const agent = request.agent(server.application);

  describe('check authentication', () => {

    it('should disallow authentication with no users', done => {
      agent
        .get('/api/session')
        .expect(403)
        .then(() => done());
    });

    it('should allow user creation without authentication', done => {
      agent
        .post('/api/user')
        .send({username: USERNAME, password: PASSWORD})
        .expect(200)
        .expect(({body}) => body.username === USERNAME)
        .then(() => {
          done();
          dispatcher.complete('create user');
        });
    });

  });

  describe('test user authentication', () => {
    before(() => dispatcher.wait('create user'));

    it('should fail because credentials are invalid', done => {
      agent
        .post('/api/session')
        .send({username: USERNAME, password: INCORRECT})
        .expect(401)
        .then(() => done());
    });

    it('should allow the user to login', done => {
      agent
        .post('/api/session')
        .send({username: USERNAME, password: PASSWORD})
        .expect(200)
        .expect(({body}) => body.username === USERNAME)
        .then(() => {
          done();
          dispatcher.complete('login');
        });
    });

  });

  describe('create ingredient', () => {
    before(() => dispatcher.wait('login'));

    it('should create the ingredient', done => {
      agent
        .post('/api/ingredients')
        .send(INGREDIENT)
        .expect(200)
        .then(response => {
          done();
          INGREDIENT.id = response.body.id;
          dispatcher.complete('create ingredient');
        });
    });

  });

  describe('test stored ingredient and create recipe', () => {
    before(() => dispatcher.wait('create ingredient').then(() => {
      RECIPE.parts.push({ingredient: INGREDIENT.id, amount: '10 oz'});
    }));

    it('should get the ingredient', done => {
      agent
        .get(`/api/ingredients/${INGREDIENT.id}`)
        .expect(200)
        .expect(({body}) => body.name === INGREDIENT.name && body.description === INGREDIENT.description)
        .then(() => done());
    });

    it('should get all ingredients', done => {
      agent
        .get('/api/ingredients')
        .expect(200)
        .then(() => done());
    });

    it('should fail to modify the ingredient description', done => {
      agent
        .post(`/api/ingredients/${INGREDIENT.id}`)
        .send({})
        .expect(400)
        .then(() => done());
    });

    it('should modify the ingredient description', done => {
      INGREDIENT.description = NEW_INGREDIENT_DESCRIPTION;
      agent
        .post(`/api/ingredients/${INGREDIENT.id}`)
        .send(INGREDIENT)
        .expect(200)
        .expect(({body}) => body.description === INGREDIENT.description)
        .then(() => {
          done();
          dispatcher.complete('modify ingredient');
        });
    });

    it('should create the recipe', done => {
      agent
        .post('/api/recipes')
        .send(RECIPE)
        .expect(200)
        .expect(({body}) => body.name === RECIPE.name && body.description === RECIPE.description)
        .then(response => {
          done();
          RECIPE.id = response.body.id;
          dispatcher.complete('create recipe');
        });
    });

  });

  describe('test stored recipe', () => {
    before(() => dispatcher.wait('create recipe'));

    it('should get the recipe', done => {
      agent
        .get(`/api/recipes/${RECIPE.id}`)
        .expect(200)
        .expect(({body}) => body.name === RECIPE.name && body.notes === RECIPE.notes)
        .then(() => done());
    });

    it('should get all recipes', done => {
      agent
        .get('/api/recipes')
        .expect(200)
        .then(() => done());
    });

    it('should fail to modify the recipe description', done => {
      agent
        .post(`/api/recipes/${RECIPE.id}`)
        .send({})
        .expect(400)
        .then(() => done());
    });

    it('should modify the recipe description', done => {
      RECIPE.description = NEW_RECIPE_DESCRIPTION;
      agent
        .post(`/api/recipes/${RECIPE.id}`)
        .send(RECIPE)
        .expect(200)
        .expect(({body}) => body.description === RECIPE.description)
        .then(() => {
          done();
          dispatcher.complete('modify recipe');
        });
    });

  });

  describe('delete recipe and ingredient', () => {
    before(() => dispatcher.wait('modify recipe'));

    it('should delete the recipe', done => {
      agent
        .delete(`/api/recipes/${RECIPE.id}`)
        .expect(200)
        .then(() => {
          done();
          dispatcher.complete('delete recipe');
        });
    });

    it('should delete the ingredient', done => {
      agent
        .delete(`/api/ingredients/${INGREDIENT.id}`)
        .expect(200)
        .then(() => done());
    });

  });

});

