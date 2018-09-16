// mongod --config /usr/local/etc/mongod.conf
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as expressSession from 'express-session';

// import { User } from './models';
// import { router } from '../working/router';
import { Modular, module } from './tricks';


export class Server extends Modular {

  public application: express.Application;

  constructor() {
    super();
    this.application = express();
    this.install();
  }

  @module
  public cookieParser(): void {
    this.application.use(cookieParser());
  }

  @module
  public bodyParser(): void {
    this.application.use(bodyParser.urlencoded({extended: true}));
    this.application.use(bodyParser.json());
  }

  @module
  public expressSession(): void {
    this.application.use(expressSession({secret: 'hush hush', resave: true, saveUninitialized: true}));
  }

  /*@module
    public passportLocal(): void {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    this.application.use(passport.initialize());
    this.application.use(passport.session());
  }*/

  /*@module
  public configureRouter(): void {
    this.application.use('/api', router);
  }*/

}

