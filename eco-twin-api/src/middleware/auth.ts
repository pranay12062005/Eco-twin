import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import redisClient from '../services/redis';

const prisma = new PrismaClient();

// ── Passport Local Strategy ──
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || (!user.passwordHash && user.googleId)) {
          return done(null, false, { message: 'Invalid credentials or try Google login.' });
        }
        if (!user.passwordHash) {
          return done(null, false, { message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return done(null, false, { message: 'Invalid credentials.' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ── Passport Google Strategy ──
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret',
      callbackURL: '/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) return done(new Error('No email found in Google profile'));

        let user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          // Link Google to existing account if not linked
          if (!user.googleId) {
            user = await prisma.user.update({
              where: { email },
              data: { googleId: profile.id, avatar: user.avatar || profile.photos?.[0].value },
            });
          }
        } else {
          // Create new user
          user = await prisma.user.create({
            data: {
              email,
              googleId: profile.id,
              name: profile.displayName || email.split('@')[0],
              avatar: profile.photos?.[0].value,
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ── JWT Helper & Middleware ──
export const generateTokens = (userId: string) => {
  const accessSecret = process.env.JWT_SECRET || 'dev_secret';
  const refreshSecret = process.env.JWT_REFRESH_SECRET || 'dev_refresh';

  const accessToken = jwt.sign({ userId }, accessSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, refreshSecret, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

export interface AuthRequest extends Request {
  user?: any; // To hold the user ID/payload
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Check if token is in Redis denylist
    const isDenied = await redisClient.get(`bl_${token}`);
    if (isDenied) {
      return res.status(401).json({ error: 'Unauthorized: Token expired' });
    }

    const accessSecret = process.env.JWT_SECRET || 'dev_secret';
    const decoded = jwt.verify(token, accessSecret) as { userId: string };

    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default passport;
