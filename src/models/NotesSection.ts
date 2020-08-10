import { Schema, model } from 'mongoose';

export const NotesSectionModelName = 'NotesSection';

const NotesSectionColors = [
  '#dfe1e6',
  '#ffd551',
  '#ff90a9',
  '#67a2ff',
  '#5df6b6',
];

const notesSectionSchema = new Schema({
  title: {
    type: String,
    required: [true, "'title' is required."],
  },
  color: {
    type: String,
    default: '#dfe1e6',
    enum: {
      values: NotesSectionColors,
      message: `\'color\' can be only ${NotesSectionColors.join(', ')}`,
    },
  },
});

export default model('NotesSection', notesSectionSchema);
