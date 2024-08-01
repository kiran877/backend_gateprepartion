import express from 'express';
import FormModel from '../models/FormModel.js';

const router = express.Router();

// Route to get all topics
router.get('/topics', async (req, res) => {
  try {
    const topics = await FormModel.find({}, 'Type Topic Description YoutubeLink Pdf isDone');
    res.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get topic details by title (Type)
router.get('/topics/:topicName', async (req, res) => {
  const { topicName } = req.params;
  console.log(topicName);
  try {
    const topics = await FormModel.find({ Type: topicName }, 'Type Topic Description YoutubeLink Pdf isDone');
    if (topics.length === 0) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topics);
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to update the completion status of a topic
router.put('/topics/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const topic = await FormModel.findById(id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Update the completion status in the database
    topic.isDone = req.body.isDone;
    await topic.save();

    res.json(topic);
  } catch (error) {
    console.error('Error updating topic:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add more routes below for your API as needed

export default router;
