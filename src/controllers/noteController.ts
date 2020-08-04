import * as core from 'express-serve-static-core';
import routes from '../routes/';
import Note from '../models/note'

const noteController = (app: core.Express): void => {
  app.get(routes.note.get, async (req, res) => {
    const notes = await Note.find().exec();
    res.send(notes);
  });

  app.post(routes.note.post, async (req, res) => {

  });
};

export default noteController;
