import { Server } from './server';


const server = new Server();
server.application.listen(8000, () => console.log('Listening on 8000'));
