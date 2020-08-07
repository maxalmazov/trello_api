import * as core from 'express-serve-static-core';
import routes from '../routes/';
import NotesSection from '../models/NotesSection'
import BadRequestError from '../lib/errors/BadRequestError';
import NotFoundError from '../lib/errors/NotFoundError';
import { asyncHandler } from '../lib/ErrorHandler';
import { Request, Response } from 'express';
import { HttpStatusCode } from '../lib/enum/HttpStatusCode';

const NotesSectionController = (app: core.Express): void => {
  app.get(routes.notesSection.getAll, asyncHandler(async (request: Request, response: Response) => {
    const noteSections = await NotesSection.find().exec();

    response.send(noteSections);
  }));

  app.get(routes.notesSection.getOneById, asyncHandler(async (request: Request, response: Response) => {
    const notesSectionId = request.params.id;

    if (!notesSectionId) {
      throw new BadRequestError('Param \'id\' is required.');
    }

    const notesSection = await NotesSection.findById(notesSectionId).exec();

    if (null === notesSection) {
      throw new NotFoundError(`NotesSection with id \'${notesSectionId}\' not found.`);
    }

    response.send(notesSection);
  }));

  app.post(routes.notesSection.post, asyncHandler(async (request, response) => {
    const newNotesSection = new NotesSection(request.body);
    const errors = newNotesSection.validateSync();

    if (errors) {
      throw new BadRequestError(errors.message)
    }

    const notesSection = await newNotesSection.save();

    response.send(notesSection);
  }));

  app.put(routes.notesSection.put, asyncHandler(async (request: Request, response: Response) => {
    const notesSectionId = request.params.id;

    if (!notesSectionId) {
      throw new BadRequestError('Param \'id\' is required.');
    }

    const result = await NotesSection.updateOne({_id: notesSectionId }, request.body).exec();

    if (!result.n) {
      throw new NotFoundError(`NotesSection with id \'${notesSectionId}\' not found.`);
    }

    response.status(HttpStatusCode.OK).send();
  }));

  app.delete(routes.notesSection.delete, asyncHandler(async (request: Request, response: Response) => {
    const notesSectionId = request.params.id;

    if (!notesSectionId) {
      throw new BadRequestError('Param \'id\' is required.');
    }

    const result = await NotesSection.deleteOne({ _id: notesSectionId}).exec();

    if (!result.n) {
      throw new NotFoundError(`NotesSection with id \'${notesSectionId}\' not found.`);
    }

    response.status(HttpStatusCode.OK).send();
  }));
};

export default NotesSectionController;
