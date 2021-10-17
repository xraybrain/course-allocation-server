import express, { NextFunction } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Application, Response } from 'express';
import { AppRequest } from './models/common.model';
import Route from './routes/Route';
dotenv.config();

class App {
  public app: Application;
  private port: string;
  constructor() {
    this.app = express();
    this.port = `${process.env.PORT}`;
    this.setup();
    this.init();
  }

  setup() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: 'sesion-secret',
      })
    );
    this.app.use(morgan('dev'));
    this.app.use((req: AppRequest, res: Response, next: NextFunction) => {
      res.locals.user = null || req.user;
      next();
    });
    new Route(this.app);
  }

  init() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ::${this.port}`);
    });
  }
}

new App();
