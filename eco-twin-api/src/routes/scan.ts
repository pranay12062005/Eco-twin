import { Router, Response } from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { uploadImage, analyzeImage } from '../services/scan.service';

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' }); // Temp local storage

router.use(requireAuth);

router.post('/', upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // 1. Upload to Cloudinary
    const imageUrl = await uploadImage(req.file.path);

    // 2. Analyze with GPT-4o Vision
    const analysis = await analyzeImage(imageUrl);

    // 3. Save to Scan History
    const scanHistory = await prisma.scanHistory.create({
      data: {
        userId: req.user.id,
        imageUrl,
        result: analysis,
        verdict: analysis.verdict,
      },
    });

    // 4. Return the analyzed item so the frontend can display the verdict/tags
    // The frontend can then confirm and call POST /api/closet to actually save it to the closet.
    res.status(200).json({ scanId: scanHistory.id, imageUrl, ...analysis });

  } catch (err) {
    console.error('Scan Route Error:', err);
    res.status(500).json({ error: 'Failed to process image scan' });
  }
});

export default router;
