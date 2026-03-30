import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { ProfileUpdateSchema, SettingsSchema } from '@eco-twin/shared';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

// ── Get Profile & Settings ──
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        name: true,
        email: true,
        title: true,
        avatar: true,
        ecoScore: true,
        accent: true,
        notifications: true,
        createdAt: true,
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// ── Update Profile ──
router.patch('/', async (req: AuthRequest, res: Response) => {
  try {
    const data = ProfileUpdateSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data,
      select: { name: true, title: true, avatar: true },
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Invalid profile data', details: err });
  }
});

// ── Update Settings ──
router.patch('/settings', async (req: AuthRequest, res: Response) => {
  try {
    const data = SettingsSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data,
      select: { accent: true, notifications: true },
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Invalid settings data', details: err });
  }
});

export default router;
