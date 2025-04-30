import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import { createCheckoutSession } from '../controllers/payment-controller';


const router = express.Router();

router.get('/create-checkout-session',isAuthenticated,createCheckoutSession);


export default router;