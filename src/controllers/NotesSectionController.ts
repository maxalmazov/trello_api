import * as core from 'express-serve-static-core';
import routes from '../routes/';
import NotesSection from '../models/NotesSection'
import BadRequestError from '../lib/errors/BadRequestError';
import NotFoundError from '../lib/errors/NotFoundError';
import handleError from '../lib/ErrorHandler';
import { Request, Response } from 'express';
import { HttpStatusCode } from '../lib/enum/HttpStatusCode';

const NotesSectionController = (app: core.Express): void => {
  app.get(routes.notesSection.getAll, async (request: Request, response: Response) => {
    const noteSections = await NotesSection.find().exec();

    response.send(noteSections);
  });

  app.get(routes.notesSection.getOneById, async (request: Request, response: Response) => {
    try {
      const notesSectionId = request.params.id;

      if (!notesSectionId) {
        throw new BadRequestError('Param \'id\' is required.');
      }

      const notesSection = await NotesSection.findById(notesSectionId).exec();

      if (null === notesSection) {
        throw new NotFoundError(`NotesSection with id \'${notesSectionId}\' not found.`);
      }

      response.send(notesSection);
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

  app.post(routes.notesSection.post, async (request, response) => {
    try {
      const newNotesSection = new NotesSection(request.body);
      const errors = newNotesSection.validateSync();

      if (errors) {
        throw new BadRequestError(errors.message)
      }

      const notesSection = await newNotesSection.save();

      response.send(notesSection);
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

  app.put(routes.notesSection.put, async (request: Request, response: Response) => {
    try {
      const notesSectionId = request.params.id;

      if (!notesSectionId) {
        throw new BadRequestError('Param \'id\' is required.');
      }

      const result = await NotesSection.updateOne({_id: notesSectionId }, request.body).exec();

      if (!result.n) {
        throw new NotFoundError(`NotesSection with id \'${notesSectionId}\' not found.`);
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

  app.delete(routes.notesSection.put, async (request: Request, response: Response) => {
    try {
      const notesSectionId = request.params.id;

      if (!notesSectionId) {
        throw new BadRequestError('Param \'id\' is required.');
      }

      const result = await NotesSection.deleteOne({ _id: notesSectionId}).exec();

      if (!result.n) {
        throw new NotFoundError(`NotesSection with id \'${notesSectionId}\' not found.`);
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

export default NotesSectionController;
