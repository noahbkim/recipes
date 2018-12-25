import { Server } from './server';


const PORT = 8000;
const server = new Server();

if (process.argv.length > 2 && process.argv[2] === 'flush') {
  server.mongoose(() =>
    server.flush());
} else {
  server.initialize(() =>
    server.listen(PORT, () =>
      console.log(`listening on ${PORT}`)));
}
