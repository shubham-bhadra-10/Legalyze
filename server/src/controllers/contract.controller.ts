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
import ContractAnalysis from '../models/contract.model';
import ContractAnalysisSchema, {
  IContractAnalysis,
} from '../models/contract.model';
import mongoose, { FilterQuery, mongo } from 'mongoose';
import { isValidMongoId } from '../utils/mongoUtils';
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

    if (user.isPremium) {
      analysis = await analyzeContractWithAI(pdfText, 'premium', contractType);
    } else {
      analysis = await analyzeContractWithAI(pdfText, 'free', contractType);
    }

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

export const getUserContracts = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  try {
    interface QueryType {
      userId: mongoose.Types.ObjectId;
    }
    const query: QueryType = { userId: user._id as mongoose.Types.ObjectId };
    const contracts = await ContractAnalysisSchema.find(
      query as FilterQuery<IContractAnalysis>
    ).sort({ createdAt: -1 });
    return res.json(contracts);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching contracts',
      error: (error as Error).message,
    });
  }
};

export const getContractById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as IUser;

  if (!isValidMongoId(id)) {
    return res.status(400).json({ message: 'Invalid contract ID' });
  }

  try {
    // Check cache
    const cachedContract = await redis.get(`contract:${id}`);
    if (cachedContract) {
      return res.json(cachedContract);
    }

    // Check database
    const contract = await ContractAnalysis.findOne({
      _id: id,
      userId: user._id,
    }).lean();

    if (!contract) {
      console.log('No contract found matching:', { id, userId: user._id });
      return res.status(404).json({ message: 'Contract not found' });
    }

    // Cache results
    await redis.set(`contract:${id}`, JSON.stringify(contract), {
      ex: 60 * 60, // 1 hour expiration
    });

    return res.json(contract);
  } catch (error) {
    console.error('Error in getContractById:', error);
    return res.status(500).json({
      message: 'Error fetching contract',
      error: (error as Error).message,
    });
  }
};
