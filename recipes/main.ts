import { Server } from './server';
import * as mongoose from 'mongoose';


mongoose.connect('mongodb://localhost:27017/recipes', { useNewUrlParser: true })
  .then(() => {
    const server = new Server();
    server.application.listen(8000, () => console.log('Listening on 8000'));
  });
