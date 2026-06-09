import 'server-only';
import { Resend } from 'resend';

/**
 * Section 6.4 / 8.6 / 10.3 — email notifications.
 * Returns null when no API key is configured so local dev / preview works
 * without sending real mail (the route logs instead).
 */
let client: Resend | null = null;

export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

export const emailFrom = process.env.EMAIL_FROM ?? 'Fekra <onboarding@resend.dev>';
