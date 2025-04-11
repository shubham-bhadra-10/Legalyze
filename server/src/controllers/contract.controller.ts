import multer from 'multer';
import { Request, Response } from 'express';

import { IUser } from '../models/user.model';
// Import the extended Request type for user property
import redis from './redis';
import {
  analyzeContractWithAI,
  detectContractType,
  extractTextFromPdf,
} from '../services/ai.services';
import ContractAnalysisSchema, {
  IContractAnalysis,
} from '../models/contract.model';
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

export const uploadMiddleware = upload;

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
    const detectedType = await detectContractType(pdfText);
    await redis.del(fileKey); // Clean up the file from Redis after processing
    return res.json({ detectedType });
  } catch (error) {
    return res.status(500).json({
      message: 'Error processing PDF',
      error: (error as Error).message,
    });
  }
};

export const analyzeContract = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  const { contractType } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  if (!contractType) {
    return res.status(400).json({ message: 'Contract type is required' });
  }
  try {
    const fileKey = `file:${user._id}:${Date.now()}`;
    await redis.set(fileKey, req.file.buffer);
    await redis.expire(fileKey, 60 * 60); // Set expiration to 1 hour
    const pdfText = await extractTextFromPdf(fileKey);

    let analysis;

    analysis = await analyzeContractWithAI(pdfText, contractType);
    console.log(analysis);

    // @ts-ignore
    // if (!analysis.summary || !analysis.risks || !analysis.opportunities) {
    //   throw new Error('Analysis failed. Please try again.');
    // }
    const savedAnalysis = await ContractAnalysisSchema.create({
      userId: user._id,
      contractText: pdfText,
      contractType,
      ...(analysis as Partial<IContractAnalysis>),
      language: 'en',
      aiModel: 'gemini-pro',
    });
    res.json(savedAnalysis);
  } catch (error) {
    console.error('Error analyzing contract:', error);
    return res.status(500).json({
      message: 'Error analyzing contract',
      error: (error as Error).message,
    });
  }
};
