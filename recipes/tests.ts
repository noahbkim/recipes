import * as request from 'supertest';

import { Server } from './server';


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
        .expect(({body}) => body.username = USERNAME)
        .end(done);
    });
    it('should fail because credentials are invalid', done => {
      agent
        .post('/api/session')
        .send({username: USERNAME, password: INCORRECT})
        .expect(401)
        .end(done);
    });
  });

});

