import { z } from 'zod';

/**
 * Section 16.4 — shared validation for all form submissions.
 * A non-empty `website` field acts as a honeypot (16.2 spam protection).
 */
const honeypot = z.string().max(0).optional();

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().max(160).optional(),
  message: z.string().min(10).max(5000),
  website: honeypot,
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email().max(200),
  website: honeypot,
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const applicationSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(5).max(40),
  linkedin: z.string().url().max(300).optional().or(z.literal('')),
  roleSlug: z.string().min(1).max(200),
  message: z.string().max(5000).optional(),
  website: honeypot,
  turnstileToken: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

/** 16.3 — CV upload constraints (validated server-side on the multipart route). */
export const CV_MAX_BYTES = 5 * 1024 * 1024; // 5MB
export const CV_ALLOWED_TYPES = ['application/pdf'];
