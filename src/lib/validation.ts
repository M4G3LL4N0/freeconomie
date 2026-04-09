import { z } from 'zod';

export const locationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  radius: z.number().min(1).max(100).default(10),
  offer_type: z.enum(['wash', 'trial', 'promo', 'all']).optional().default('all'),
  limit: z.number().min(1).max(100).optional().default(20),
});

export const submitOfferSchema = z.object({
  name: z.string().min(2).max(100),
  address: z.string().min(5).max(200),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  offer_type: z.enum(['wash', 'trial', 'promo']),
  details: z.string().min(10).max(500),
  expires_at: z.string().datetime(),
});
