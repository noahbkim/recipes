import * as request from 'supertest';

import { Server } from './server';


const server = new Server('recipes-test');
server.initialize(() => {

  describe('test function', () => {
    it('should return zero', () => {
      console.log('okay');
    });
  });

  server.flush(() => console.log('cleared database!'));
});
