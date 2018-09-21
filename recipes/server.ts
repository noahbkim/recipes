// mongod --config /usr/local/etc/mongod.conf
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as expressSession from 'express-session';

import { UserModel } from './models/user';
import { Modular, module } from './tricks';
import { router } from './router';


export class Server extends Modular {

  public application: express.Application;

  constructor() {
    super();
    this.application = express();
  }

  public listen(port: number, then: Function): void {
    this.application.listen(port, then);
  }

  @module
  public mongoose(next: Function): void {
    mongoose.connect('mongodb://localhost:27017/recipes', { useNewUrlParser: true }).then(() => next());
  }

  @module
  public cookieParser(next: Function): void {
    this.application.use(cookieParser());
    console.log('Installed cookie parser...');
    next();
  }

  @module
  public bodyParser(next: Function): void {
    this.application.use(bodyParser.urlencoded({extended: true}));
    this.application.use(bodyParser.json());
    console.log('Installed body parser...');
    next();
  }

  @module
  public expressSession(next: Function): void {
    this.application.use(expressSession({secret: 'hush hush', resave: true, saveUninitialized: true}));
    console.log('Installed express session...');
    next();
  }

  @module
  public passportLocal(next: Function): void {
    passport.use((UserModel as any).createStrategy());
    passport.serializeUser((UserModel as any).serializeUser());
    passport.deserializeUser((UserModel as any).deserializeUser());
    this.application.use(passport.initialize());
    this.application.use(passport.session());
    console.log('Installed passport local...');
    next();
  }

  @module
  public configureRouter(next: Function): void {
    this.application.use('/api', router);
    console.log('Installed the URL router...');
    next();
  }

}
