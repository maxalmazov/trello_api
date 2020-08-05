import { Schema, model } from 'mongoose';

export const NotesSectionModelName = 'NotesSection';

const notesSectionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#dfe1e6',
  },
});

export default model('NotesSection', notesSectionSchema);
