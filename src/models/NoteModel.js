import mongoose from 'mongoose';

// Define the schema for the Note model
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  category: String,
  tags: [String],
  isArchived: Boolean,
  isFavorite: Boolean,
});

// Create and export the Note model
const Note = mongoose.model('Note', noteSchema);

export default Note;
