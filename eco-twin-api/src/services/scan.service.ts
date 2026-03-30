import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import OpenAI from 'openai';
import { ScanResultSchema, ScanResult } from '@eco-twin/shared';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// OpenAI config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SCAN_PROMPT = `You are Eco-Twin, an AI sustainable fashion expert. Analyze this clothing image.
Return ONLY a valid JSON object matching this exact schema, with no markdown formatting or extra text:
{
  "name": "string - short descriptive item name (e.g. 'Vintage Denim Jacket')",
  "brand": "string or null - guess if visible, else null",
  "material": "string - guess primary fabric composition (e.g. '100% Cotton', 'Polyester Blend')",
  "origin": "string or null",
  "ecoScore": "number 1-100 - sustainability rating based on material and style (100 is best)",
  "carbonKg": "number - estimated lifetime CO2 footprint in kg (e.g. 15.5)",
  "category": "one of exactly: Tops, Bottoms, Outerwear, Shoes, Accessories",
  "color": "string - primary dominant hex color of the item, e.g. '#2A4B7C'",
  "tags": "array of 3-5 strings - eco-relevant tags with emoji prefixes (e.g. '♻️ Recycled', '💧 Water Heavy')",
  "verdict": "one of exactly: go, caution, stop (based on eco impact)"
}`;

export const uploadImage = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder: 'ecotwin' });
    // Clean up local temp file after upload
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    throw new Error('Image upload failed');
  }
};

export const analyzeImage = async (imageUrl: string): Promise<ScanResult> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: SCAN_PROMPT },
            { type: 'image_url', image_url: { url: imageUrl } },
          ],
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No content returned from OpenAI');

    // Parse and validate the JSON against our Zod schema
    const parsed = JSON.parse(content);
    return ScanResultSchema.parse(parsed);

  } catch (error) {
    console.error('AI Analysis failed:', error);
    throw new Error('Failed to analyze image');
  }
};
