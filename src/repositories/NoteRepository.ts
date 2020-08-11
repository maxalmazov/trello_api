import Note from '../models/Note';
import BadRequestError from '../lib/errors/BadRequestError';
import { NoteInterface } from '../models/types';

const getAll = () => Note.find().exec();

const findById = (noteId: string) => Note.findById(noteId).exec();

const updateOneById = (noteId: string, note: NoteInterface) => Note.updateOne(
  { _id: noteId },
  note,
).exec();

const deleteOneById = (noteId: string) => Note.deleteOne({ _id: noteId },).exec();


export default {
  getAll,
  findById,
  updateOneById,
  deleteOneById,
}
