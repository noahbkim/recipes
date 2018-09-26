import * as request from 'supertest';

import { Server } from './server';
import { Tracker } from './library/eventful';


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
  steps: ['pour into glass'],
  notes: ['best served cold'],
  tags: ['basic', 'virgin']
};

const tracker = new Tracker();


describe('recipes', () => {
  const agent = request.agent(server.application);

  describe('check authentication', () => {

    it('should disallow authentication with no users', done => {
      agent
        .get('/api/session')
        .expect(403)
        .end(done);
    });

    it('should allow user creation without authentication', done => {
      agent
        .post('/api/user')
        .send({username: USERNAME, password: PASSWORD})
        .expect(200)
        .expect(({body}) => body.username === USERNAME)
        .end(() => {
          done();
          tracker.complete('create user');
        });
    });

    describe('wait for user to be created', () => {
      before(() => tracker.wait('create user'));

      it('should fail because credentials are invalid', done => {
        agent
          .post('/api/session')
          .send({username: USERNAME, password: INCORRECT})
          .expect(401)
          .end(done);
      });

      it('should allow the user to login', done => {
        agent
          .post('/api/session')
          .send({username: USERNAME, password: PASSWORD})
          .expect(200)
          .expect(({body}) => body.username === USERNAME)
          .end(() => {
            done();
            tracker.complete('login');
          });
      });

      describe('wait for user to login', () => {
        before(() => tracker.wait('login'));

        it('should create the ingredient', done => {
          agent
            .post('/')
        });

      });

    });

  });

});

