import * as core from 'express-serve-static-core';
import routes from '../routes/';
import Note from '../models/Note';
import { asyncHandler } from '../lib/ErrorHandler';
import BadRequestError from '../lib/errors/BadRequestError';
import NotFoundError from '../lib/errors/NotFoundError';
import { Request, Response } from 'express';
import { HttpStatusCode } from '../lib/enum/HttpStatusCode';
import { UpdateWriteOpResult } from 'mongodb';
import NoteRepository from '../repositories/NoteRepository';

const NoteController = (app: core.Express): void => {
  app.get(
    routes.note.getAll,
    asyncHandler(async (request: Request, response: Response) => {
      const notes = await NoteRepository.getAll();

      response.send(notes);
    }),
  );

  app.get(
    routes.note.getOneById,
    asyncHandler(async (request: Request, response: Response) => {
      const noteId = request.params.id;

      if (!noteId) {
        throw new BadRequestError('Param \'id\' is required.');
      }

      const note = await NoteRepository.findById(noteId);

      if (null === note) {
        throw new NotFoundError(`Note with id '${noteId}' not found.`);
      }

      response.send(note);
    }),
  );

  app.post(
    routes.note.post,
    asyncHandler(async (request: Request, response: Response) => {
      const newNote = new Note(request.body);
      const errors = newNote.validateSync();

      if (errors) {
        // TODO: handle CastError
        throw new BadRequestError(errors.message);
      }

      const note = await newNote.save();

      response.send(note);
    }),
  );

  app.put(
    routes.note.put,
    asyncHandler(async (request: Request, response: Response) => {
      const noteId = request.params.id;

      if (!noteId) {
        throw new BadRequestError("Param 'id' is required.");
      }

      // TODO: handle CastError
      const result: UpdateWriteOpResult['result'] = await NoteRepository.updateOneById(
        noteId,
        request.body,
      );

      if (!result.n) {
        throw new NotFoundError(`Note with id '${noteId}' not found.`);
      }

      response.status(HttpStatusCode.OK).send();
    }),
  );

  app.delete(
    routes.note.delete,
    asyncHandler(async (request: Request, response: Response) => {
      const noteId = request.params.id;

      if (!noteId) {
        throw new BadRequestError("Param 'id' is required.");
      }

      const result = await NoteRepository.deleteOneById(noteId);

      if (!result.n) {
        throw new NotFoundError(`Note with id '${noteId}' not found.`);
      }

      response.status(HttpStatusCode.OK).send();
    }),
  );
};

export default NoteController;
