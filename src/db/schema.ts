import { z } from "zod";

export const WaitlistSchema = z.object({
  email: z.string().email(),
  createdAt: z.date().default(() => new Date()),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
});

export const RouteSignalSchema = z.object({
  id: z.string(),
  userId: z.string(),
  label: z.string(),
  title: z.string(),
  description: z.string(),
  meta: z.string(),
  theme: z.enum(["cyan", "violet", "orange", "emerald"]),
  verificationFlags: z.array(z.string()),
  createdAt: z.date(),
});
