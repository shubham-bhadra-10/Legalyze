import multer from 'multer';
import { Request, Response } from 'express';

import { IUser } from '../models/user.model';
import '../types/express'; // Import the extended Request type for user property
import redis from './redis';
import { extractTextFromPdf } from '../services/ai.services';
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      return cb(null, true);
    } else {
      cb(null, false);
      cb(new Error('Only .pdf format allowed!'));
    }
  },
}).single('contract');

export const detectAndConfirmContractType = async (
  req: Request,
  res: Response
) => {
  const user = req.user as IUser;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    const fileKey = `file:${user._id}:${Date.now()}`;
    await redis.set(fileKey, req.file.buffer);
    await redis.expire(fileKey, 60 * 60); // Set expiration to 1 hour
    const pdfText = await extractTextFromPdf(fileKey);
    return res.status(200).json({ text: pdfText });
  } catch (error) {
    return res.status(500).json({
      message: 'Error processing PDF',
      error: (error as Error).message,
    });
  }
};
