import express from 'express';
import multer from 'multer';
import path from 'path';
import FormModel from '../models/FormModel.js';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });

router.post('/submitForm', uploadMiddleware.single('Pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { Type, Topic, Description, YoutubeLink } = req.body; // Added Description

    const params = {
      Bucket: 'gatepreparation',
      Key: `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(req.file.originalname)}`,
      Body: req.file.buffer,
    };

    const s3UploadPromise = () => {
      return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
          if (err) {
            console.error('Error uploading file to S3:', err);
            reject(err);
          } else {
            console.log('File uploaded to S3:', data.Location);
            resolve(data.Location);
          }
        });
      });
    };

    const pdfUrl = await s3UploadPromise();

    const newFormData = new FormModel({
      Type,
      Topic,
      Description, // Added Description
      YoutubeLink,
      Pdf: pdfUrl,
    });

    await newFormData.save();

    console.log('Form data submitted successfully');
    res.status(201).json({ message: 'Form data submitted successfully' });
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

export default router;
