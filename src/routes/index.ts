import noteRoutes from './noteRoutes';
import { Db } from 'mongodb';
import * as core from 'express-serve-static-core';

const routes = (app: core.Express, db: Db): void => {
  noteRoutes(app, db);

  app.get('/', (req, res) => {
    res.send("yep, it's working");
  });
};

export default routes;
