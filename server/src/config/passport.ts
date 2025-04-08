import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import User, { IUser } from '../models/user.model';

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'], // Explicitly request profile and email
      passReqToCallback: true, // If you need access to the request object
    },
    async (
      req: Express.Request,
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: any, user?: IUser | false) => void
    ) => {
      try {
        // Find or create user
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails![0].value,
            displayName: profile.displayName,
            profileImage: profile.photos![0].value,
            // Add any additional fields you want to save
          });
        }

        return done(null, user);
      } catch (error) {
        console.error('Error during Google authentication:', error);
        return done(error, undefined);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(
  async (id: string, done: (err: any, user?: IUser | false) => void) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(null, false); // User not found
      }
      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  }
);

export default passport;
