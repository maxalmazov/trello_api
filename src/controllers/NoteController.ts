import * as core from 'express-serve-static-core';
import routes from '../routes/';
import Note from '../models/Note'
import handleError from '../lib/ErrorHandler';
import BadRequestError from '../lib/errors/BadRequestError';
import NotFoundError from '../lib/errors/NotFoundError';
import { Request, Response } from 'express';
import { HttpStatusCode } from '../lib/enum/HttpStatusCode';

const NoteController = (app: core.Express): void => {
  app.get(routes.note.getAll, async (request: Request, response: Response) => {
    const noteSections = await Note.find().exec();

    response.send(noteSections);
  });

  app.get(routes.note.getOneById, async (request: Request, response: Response) => {
    try {
      const noteId = request.params.id;

      if (!noteId) {
        throw new BadRequestError('Param \'id\' is required.');
      }

      const note = await Note.findById(noteId).exec();

      if (null === note) {
        throw new NotFoundError(`Note with id \'${noteId}\' not found.`);
      }

      response.send(note);
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
    try {
      const newNote = new Note(request.body);
      const errors = newNote.validateSync();

      if (errors) {
        // TODO: handle CastError
        throw new BadRequestError(errors.message)
      }

      const note = await newNote.save();

      response.send(note);
    } catch (error) {
      if (error instanceof BadRequestError) {
        response.status(error.httpCode).send(handleError(error));
      } else {
        // TODO: create default error handling
        console.log(error);
        response.status(500).send('Server Error.');
      }
    }
  });

  app.put(routes.note.put, async (request: Request, response: Response) => {
    try {
      const noteId = request.params.id;

      if (!noteId) {
        throw new BadRequestError('Param \'id\' is required.');
      }

      // TODO: handle CastError
      const result = await Note.updateOne({_id: noteId }, request.body).exec();

      if (!result.n) {
        throw new NotFoundError(`Note with id \'${noteId}\' not found.`);
      }

      response.status(HttpStatusCode.OK).send();
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

  app.delete(routes.note.delete, async (request: Request, response: Response) => {
    try {
      const noteId = request.params.id;

      if (!noteId) {
        throw new BadRequestError('Param \'id\' is required.');
      }

      const result = await Note.deleteOne({ _id: noteId}).exec();

      if (!result.n) {
        throw new NotFoundError(`Note with id \'${noteId}\' not found.`);
      }

      response.status(HttpStatusCode.OK).send();
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
};

export default NoteController;
