import { Server } from './server';


const PORT = 8000;

const server = new Server();
server.initialize(() =>
  server.listen(PORT, () =>
    console.log(`listening on ${PORT}`)));
