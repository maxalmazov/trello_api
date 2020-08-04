import * as core from 'express-serve-static-core';
import routes from '../routes/';
import NotesSection from '../models/notesSection'

const notesSectionController = (app: core.Express): void => {
  app.get(routes.notesSection.get, async (req, res) => {
    const notes = await NotesSection.find().exec();
    res.send(notes);
  });

  app.post(routes.notesSection.post, async (req, res) => {
    // TODO: validate body request
    const newNotesSection = new NotesSection(req.body);
    const notesSection = newNotesSection.save((error, notesSection) => {
      if (error) {
        return error;
      }

      return notesSection;
    });

    res.send(notesSection);
  });
};

export default notesSectionController;
