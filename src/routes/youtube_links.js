import express from 'express';
import FormModel from '../models/FormModel.js';

const router = express.Router();

// Route to get YouTube links from the database
// Route to get YouTube links from the database
router.get('/youtube-links', async (req, res) => {
  try {
    const youtubeLinks = await FormModel.find({}, 'YoutubeLink Topic'); // Update field names

    console.log('YouTube links:', youtubeLinks);
    res.json(youtubeLinks);
  } catch (error) {
    console.error('Error fetching YouTube links:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Other routes and middleware...

export default router;
