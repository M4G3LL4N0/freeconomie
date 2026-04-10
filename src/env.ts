import { z } from "zod";
import type { FreeconomyCategory } from "@/types/freewash";

const envSchema = z.object({
  // Core services
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  EMAIL_FROM: z.string().email(),

  // Feature flags
  NEXT_PUBLIC_BETA_ROUTE_INTEL: z
    .enum(['on', 'off'])
    .default('off')
    .transform(val => val === 'on'),
  NEXT_PUBLIC_ENABLE_SUBMISSIONS: z
    .enum(['on', 'off'])
    .default('off')
    .transform(val => val === 'on'),

  // Dynamic configuration  
  NEXT_PUBLIC_FREEONOMY_CATEGORIES: z
    .string()
    .default('free-car-wash,free-membership-trial')
    .transform(s => s.split(',') as FreeconomyCategory[]),
  NEXT_PUBLIC_DEFAULT_REGION: z
    .string()
    .default('South Bay,Peninsula,East Bay')
    .transform(s => s.split(',')),
});

export const env = envSchema.parse(process.env);

// Runtime validation check
if (typeof window !== 'undefined' && !env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('Missing required env vars');
}
