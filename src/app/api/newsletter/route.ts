import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validation/forms';
import { getResend, emailFrom } from '@/lib/email/resend';

/**
 * Newsletter sign-up. Validates the email, then notifies Fekra via Resend when
 * configured; otherwise logs (so local/preview works without mail set up).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 422 });
  }

  const { email, website } = parsed.data;
  if (website) {
    // Honeypot tripped — pretend success, do nothing.
    return NextResponse.json({ ok: true });
  }

  const resend = getResend();
  const to = process.env.CONTACT_TO ?? 'info@fekra-egy.com';

  try {
    if (resend) {
      await resend.emails.send({
        from: emailFrom,
        to,
        subject: 'New newsletter subscriber',
        text: `New subscriber: ${email}`,
      });
    } else {
      console.info('[newsletter] new subscriber (no RESEND_API_KEY):', email);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[newsletter] send failed', err);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 });
  }
}
