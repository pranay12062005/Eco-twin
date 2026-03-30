import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    // Aggregate user's items for dashboard statistics
    const items = await prisma.clothingItem.findMany({
      where: { userId: req.user.id, archived: false },
      select: { ecoScore: true, price: true, wears: true, category: true, carbonKg: true, verdict: true },
    });

    const totalItems = items.length;
    let totalScore = 0;
    let totalValue = 0;
    let totalWears = 0;
    let totalCarbon = 0;

    let greenCount = 0;
    let orangeCount = 0;
    let redCount = 0;

    const categoryBreakdown: Record<string, number> = {};

    for (const item of items) {
      totalScore += item.ecoScore;
      totalValue += item.price || 0;
      totalWears += item.wears;
      totalCarbon += item.carbonKg;

      if (item.verdict === 'go') greenCount++;
      else if (item.verdict === 'caution') orangeCount++;
      else redCount++;

      categoryBreakdown[item.category] = (categoryBreakdown[item.category] || 0) + 1;
    }

    const sustainabilityScore = totalItems > 0 ? Math.round(totalScore / totalItems) : 0;

    // Convert breakdown back to array for frontend pie chart mapping
    const categories = Object.keys(categoryBreakdown).map((name) => ({
      name,
      count: categoryBreakdown[name],
      percentage: Math.round((categoryBreakdown[name] / totalItems) * 100),
    }));

    res.json({
      totalItems,
      sustainabilityScore,
      totalValue,
      totalWears,
      verdicts: {
        green: greenCount,
        orange: orangeCount,
        red: redCount
      },
      categories,
      savings: {
        co2SavedStr: totalCarbon.toFixed(1) + 'kg',
        co2SavedVal: totalCarbon,
        moneySavedStr: '$0', // Placeholder for "not-bought" tracker
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;
