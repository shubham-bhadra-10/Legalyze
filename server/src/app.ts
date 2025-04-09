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

const app = express();
// console.log(process.env.MONGODB_URI);
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
app.use(express.json());
app.use(morgan('dev'));

// Set up session middleware
app.use(
  session({
    // Secret used to sign the session ID cookie (should be a long, random string in production)
    secret: process.env.GOOGLE_CLIENT_SECRET!,

    // Don't save the session if it wasn't modified during the request
    resave: false,

    // Don't create a session until something is stored in it
    saveUninitialized: false,

    // Store sessions in MongoDB using connect-mongo
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI!, // Connection string to your MongoDB
    }),

    // Cookie settings
    cookie: {
      // Only send cookie over HTTPS in production (secure in production, false in development)
      secure: process.env.NODE_ENV === 'production',

      // CSRF protection settings:
      // - 'none' allows cross-site usage (needed if your frontend/backend are on different domains)
      // - 'lax' is more secure for same-site or simple cross-site usage
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',

      // Cookie expiration time (1 day in milliseconds)
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// store session in MongoDB
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/contracts', authRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
