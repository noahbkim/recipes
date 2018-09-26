import * as request from 'supertest';

import { Server } from './server';


const server = new Server('recipes-test');

before(done => {
  server.initialize(done);
});

after(() => {
  server.flush(() =>
    server.disconnect( () =>
      console.log('shut down server!')));
});


const USERNAME = 'username';
const PASSWORD = 'password';


describe('recipes', () => {
  const agent = request.agent(server.application);

  describe('user authentication', () => {
    it('should disallow authentication with no users', done => {
      agent
        .get('/authenticate')
        .expect(403)
        .end((error, response) => {
          done();
        });
      }
    );
    it('should allow user creation without authentication', done => {
      agent
        .post('/user')
        .send({username: USERNAME, password: PASSWORD})
        .expect(200)
        .expect(({body}) => body.username = USERNAME)
        .end((error, response) => {
          done();
        });
    });
  });

});

