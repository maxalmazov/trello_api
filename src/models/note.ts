import { Schema, model } from 'mongoose';
import { NotesSectionModelName } from './notesSection';

export const NoteModelName = 'Note';

const noteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: NotesSectionModelName,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueTo: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '#ffffff'
  },
});

export default model('Note', noteSchema);
