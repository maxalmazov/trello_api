import * as core from 'express-serve-static-core';
import NoteController from './NoteController';
import NotesSectionController from './NotesSectionController';

const Controllers = (app: core.Express): void => {
  NoteController(app);
  NotesSectionController(app);

  app.get('/', (req, res) => {
    res.send("yep, it's working");
  });
};

export default Controllers;
