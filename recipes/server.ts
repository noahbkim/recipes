// mongod --config /usr/local/etc/mongod.conf
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as expressSession from 'express-session';

import { UserModel } from './models/user';
import { Modular, module } from './library/tricks';
import { router } from './router';


export class Server extends Modular {

  public application: express.Application;
  private database: string;

  constructor(database = 'recipes') {
    super();
    this.database = database;
    this.application = express();
  }

  public listen(port: number, then: Function): void {
    this.application.listen(port, then);
  }

  public flush(then: Function): void {
    mongoose.connection.db.dropDatabase().then(() => then());
  }

  @module
  public mongoose(next: Function): void {
    mongoose.connect(`mongodb://localhost:27017/${this.database}`, { useNewUrlParser: true }).then(
      () => next(),
      () => console.log('failed to connect to database!'));
  }

  @module
  public cookieParser(next: Function): void {
    this.application.use(cookieParser());
    console.log('installed cookie parser...');
    next();
  }

  @module
  public bodyParser(next: Function): void {
    this.application.use(bodyParser.urlencoded({extended: true}));
    this.application.use(bodyParser.json());
    console.log('installed body parser...');
    next();
  }

  @module
  public expressSession(next: Function): void {
    this.application.use(expressSession({secret: 'hush hush', resave: true, saveUninitialized: true}));
    console.log('installed express session...');
    next();
  }

  @module
  public passportLocal(next: Function): void {
    passport.use((UserModel as any).createStrategy());
    passport.serializeUser((UserModel as any).serializeUser());
    passport.deserializeUser((UserModel as any).deserializeUser());
    this.application.use(passport.initialize());
    this.application.use(passport.session());
    console.log('installed passport local...');
    next();
  }

  @module
  public configureRouter(next: Function): void {
    this.application.use('/api', router);
    console.log('installed the URL router...');
    next();
  }

}
