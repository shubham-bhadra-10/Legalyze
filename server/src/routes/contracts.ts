import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import {
  analyzeContract,
  detectAndConfirmContractType,
  getUserContracts,
  uploadMiddleware,
} from '../controllers/contract.controller';
import { handleErrors } from '../middleware/errors';
import { get } from 'http';
const router = express.Router();

router.post(
  '/detect-type',
  isAuthenticated,
  uploadMiddleware,
  handleErrors(detectAndConfirmContractType)
);
router.post(
  '/analyze',
  isAuthenticated,
  uploadMiddleware,
  handleErrors(analyzeContract)
);
router.get(
  '/user-contracts',
  isAuthenticated,
  handleErrors(getUserContracts)
);
export default router;
