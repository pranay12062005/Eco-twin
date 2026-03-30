import { z } from 'zod';

// ── Clothing Item ──
export const ClothingItemSchema = z.object({
  name: z.string().min(1),
  brand: z.string().nullable().optional(),
  material: z.string().nullable().optional(),
  origin: z.string().nullable().optional(),
  ecoScore: z.number().int().min(0).max(100),
  carbonKg: z.number().nonnegative(),
  category: z.enum(['Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories']),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).nullable().optional(),
  price: z.number().nonnegative().nullable().optional(),
  wears: z.number().int().nonnegative().default(0),
  tags: z.array(z.string()).default([]),
  verdict: z.enum(['go', 'caution', 'stop']),
  imageUrl: z.string().url().nullable().optional(),
});

export type ClothingItemInput = z.infer<typeof ClothingItemSchema>;

// ── AI Scan Result ──
export const ScanResultSchema = z.object({
  name: z.string().min(1),
  brand: z.string().nullable(),
  material: z.string(),
  origin: z.string().nullable(),
  ecoScore: z.number().int().min(1).max(100),
  carbonKg: z.number().positive(),
  category: z.enum(['Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories']),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  tags: z.array(z.string()).min(1).max(8),
  verdict: z.enum(['go', 'caution', 'stop']),
});

export type ScanResult = z.infer<typeof ScanResultSchema>;

// ── Auth ──
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(100),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ── Profile Update ──
export const ProfileUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  title: z.string().max(200).optional(),
  avatar: z.string().optional(),
});

// ── Settings ──
export const SettingsSchema = z.object({
  accent: z.enum(['green', 'orange', 'amber', 'blue']).optional(),
  notifications: z.boolean().optional(),
});

export type Accent = 'green' | 'orange' | 'amber' | 'blue';
export type Verdict = 'go' | 'caution' | 'stop';
export type Category = 'Tops' | 'Bottoms' | 'Outerwear' | 'Shoes' | 'Accessories';
