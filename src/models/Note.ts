import { Schema, model } from 'mongoose';
import { NOTES_SECTION_MODEL_NAME } from './NotesSection';

export const NOTE_MODEL_NAME = 'Note';

const NoteColors = ['#ffffff', '#ffbb37', '#ff768f', '#4d88ff', '#43dc9c'];

const noteSchema = new Schema({
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: NOTES_SECTION_MODEL_NAME,
    required: [true, "'sectionID' is required"],
  },
  title: {
    type: String,
    required: [true, "'title' is required."],
  },
  description: {
    type: String,
    default: '',
  },
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
    default: '#ffffff',
    enum: {
      values: NoteColors,
      message: `'color' can be only ${NoteColors.join(', ')}`,
    },
  },
});

export default model('Note', noteSchema);
