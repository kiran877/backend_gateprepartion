import express from 'express';
import Note from '../models/NoteModel.js';

const router = express.Router();

// Create a new note
// Create a new note
router.post('/notes', async (req, res) => {
  try {
    const { content } = req.body; // Change 'content' to 'title' if needed
    const newNote = new Note({
      title: req.body.title, // Add title property
      content,
      author: 'Your Author', // Replace with your desired author
      category: 'Your Category', // Replace with your desired category
      tags: ['Your Tags'], // Replace with your desired tags
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error creating a new note:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Retrieve all notes
// Retrieve all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Retrieve a specific note by ID
router.get('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error('Error fetching a note by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a specific note by ID
router.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error updating a note by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a specific note by ID
router.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndRemove(id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting a note by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default router;
