import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './config/passport';
//routes
import authRoute from './routes/auth';
import contractRoute from './routes/contracts';
import paymentRoute from './routes/payment';
import { handleWebhook } from './controllers/payment-controller';

const app = express();

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
  });

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(helmet());
app.use(morgan('dev'));

// Define the webhook route BEFORE the JSON middleware
// This ensures the raw body is available for this route
app.post(
  '/payments/webhook',
  express.raw({ type: 'application/json' }),
  handleWebhook
);

// Apply JSON middleware to all other routes AFTER the webhook route
app.use(express.json());

// Set up session middleware
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI!,
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/contracts', contractRoute);
app.use('/payments', paymentRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
