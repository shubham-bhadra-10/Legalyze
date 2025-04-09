import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import {
  detectAndConfirmContractType,
  uploadMiddleware,
} from '../controllers/contract.controller';
import { handleErrors } from '../middleware/errors';
const router = express.Router();

router.post(
  '/detect-type',
  isAuthenticated,
  uploadMiddleware,
  handleErrors(detectAndConfirmContractType)
);
