import type { Payload } from 'payload'

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/**
 * Internal notifications (10.6 / 11.4). Delivery failure never fails the
 * submission — the record is already in the database, so we log and move on
 * rather than showing the user an error for something that did work.
 */
export async function notify(
  payload: Payload,
  { to, subject, rows }: { to: string[]; subject: string; rows: [string, string | undefined][] },
): Promise<void> {
  if (!to.length) {
    payload.logger.warn(`No notification recipients configured for "${subject}"`)
    return
  }

  const html = `<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#687170">${escapeHtml(label)}</td><td style="padding:6px 12px"><strong>${escapeHtml(
          String(value),
        )}</strong></td></tr>`,
    )
    .join('')}</table>`

  try {
    await payload.sendEmail({ to: to.join(','), subject, html })
  } catch (error) {
    payload.logger.error({ err: error }, `Failed to send notification "${subject}"`)
  }
}
