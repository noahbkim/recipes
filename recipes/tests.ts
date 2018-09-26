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
  name: 'water',
  description: 'the source of organic life on earth'
};
const RECIPE = {
  name: 'water',
  description: 'a timeless classic',
  parts: [],
  steps: [{description: 'pour into glass'}],
  notes: ['best served cold'],
  tags: ['basic', 'virgin']
};

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

    describe('wait for user to be created', () => {
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

    describe('wait for user to login', () => {
      before(() => dispatcher.wait('login'));

      it('should create the ingredient', done => {
        agent
          .post('/api/ingredients')
          .send(INGREDIENT)
          .expect(200)
          .then(response => {
            done();
            dispatcher.complete('create ingredient', response.body.id);
          });
      });

    });

    let ingredientId;

    describe('wait for ingredient to be created', () => {
      before(() => dispatcher.wait('create ingredient').then(id => {
        ingredientId = id;
        RECIPE.parts.push({ingredient: id, amount: '10 oz'});
      }));

      it('should get the ingredient', done => {
        agent
          .get(`/api/ingredients/${ingredientId}`)
          .expect(200)
          .expect(({body}) => body.name === INGREDIENT.name && body.description === INGREDIENT.description)
          .then(() => done());
      });

      it('should create the recipe', done => {
        agent
          .post('/api/recipes')
          .send(RECIPE)
          .expect(200)
          .then(response => {
            done();
            dispatcher.complete('create recipe', response.body.id);
          });
      });

    });

  });

});

