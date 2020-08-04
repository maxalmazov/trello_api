import * as core from 'express-serve-static-core';
import noteController from './noteController';
import notesSectionController from './notesSectionController';

const controllers = (app: core.Express): void => {
  noteController(app);
  notesSectionController(app);

  app.get('/', (req, res) => {
    res.send("yep, it's working");
  });
};

export default controllers;
