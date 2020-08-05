import * as core from 'express-serve-static-core';
import routes from '../routes/';
import Note from '../models/Note'
import handleError from '../lib/ErrorHandler';
import BadRequestError from '../lib/errors/BadRequestError';
import NotFoundError from '../lib/errors/NotFoundError';

const NoteController = (app: core.Express): void => {
  app.get(routes.note.getOneById, async (request, response) => {
    try {
      if (!request.params.id) {
        throw new BadRequestError('Param \'id\' is required.');
      }

      const notes = await Note.findById(request.params.id).exec();

      if (null === notes) {
        throw new NotFoundError(`Note with id \'${request.params.id}\' not found.`);
      }

      response.send(notes);
    } catch (error) {
      if (error instanceof BadRequestError) {
        response.status(error.httpCode).send(handleError(error));
      } else if (error instanceof NotFoundError) {
        response.status(error.httpCode).send(handleError(error));
      } else {
        // TODO: create default error handling
        console.log(error);
        response.status(500).send('Server Error.');
      }
    }
  });

  app.post(routes.note.post, async (request, response) => {

  });
};

export default NoteController;
