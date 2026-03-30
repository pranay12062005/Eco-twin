import { Router, Request, Response } from 'express';
import passport, { generateTokens } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redisClient from '../services/redis';
import { RegisterSchema, LoginSchema } from '@eco-twin/shared';

const router = Router();
const prisma = new PrismaClient();

// ── Register ──
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = RegisterSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    });

    const { accessToken, refreshToken } = generateTokens(user.id);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ user: { id: user.id, email: user.email, name: user.name }, accessToken });
  } catch (err) {
    res.status(400).json({ error: 'Invalid input', details: err });
  }
});

// ── Login ──
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message || 'Login failed' });

    const { accessToken, refreshToken } = generateTokens(user.id);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar }, accessToken });
  })(req, res, next);
});

// ── Refresh Token ──
router.post('/refresh', async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  try {
    // Has the refresh token itself been denied/logged out?
    const isDenied = await redisClient.get(`bl_${refreshToken}`);
    if (isDenied) return res.status(401).json({ error: 'Token revoked' });

    const refreshSecret = process.env.JWT_REFRESH_SECRET || 'dev_refresh';
    const decoded = jwt.verify(refreshToken, refreshSecret) as { userId: string };

    const { accessToken } = generateTokens(decoded.userId);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});

// ── Logout ──
router.post('/logout', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.cookies?.refreshToken;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.decode(token) as { exp: number };
      if (decoded && decoded.exp) {
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) await redisClient.setEx(`bl_${token}`, ttl, 'denied');
      }
    } catch (e) { }
  }

  if (refreshToken) {
    try {
      const decoded = jwt.decode(refreshToken) as { exp: number };
      if (decoded && decoded.exp) {
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) await redisClient.setEx(`bl_${refreshToken}`, ttl, 'denied');
      }
    } catch (e) { }
    res.clearCookie('refreshToken');
  }

  res.json({ message: 'Logged out successfully' });
});

export default router;
