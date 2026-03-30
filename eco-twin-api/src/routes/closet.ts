import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { ClothingItemSchema } from '@eco-twin/shared';

const router = Router();
const prisma = new PrismaClient();

// All routes require authentication
router.use(requireAuth);

// ── Get All Items ──
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const items = await prisma.clothingItem.findMany({
      where: { userId: req.user.id, archived: false },
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch closet' });
  }
});

// ── Get Single Item ──
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const item = await prisma.clothingItem.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// ── Add Item ──
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const data = ClothingItemSchema.parse(req.body);
    const item = await prisma.clothingItem.create({
      data: { ...data, userId: req.user.id },
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid item data', details: err });
  }
});

// ── Update Item ──
router.patch('/:id', async (req: AuthRequest, res: Response) => {
  try {
    // Basic structural validation for partial updates
    const data = ClothingItemSchema.partial().parse(req.body);

    // Ensure the item belongs to the user
    const existing = await prisma.clothingItem.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!existing) return res.status(404).json({ error: 'Item not found' });

    const item = await prisma.clothingItem.update({
      where: { id: req.params.id },
      data,
    });

    // Unlock "First Wear" badge if wears > 0
    if (data.wears && data.wears > 0 && existing.wears === 0) {
      // (Badge logic will be handled via user-badges service)
    }

    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Update failed', details: err });
  }
});

// ── Soft Delete Item ──
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.clothingItem.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!existing) return res.status(404).json({ error: 'Item not found' });

    await prisma.clothingItem.update({
      where: { id: req.params.id },
      data: { archived: true },
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

export default router;
