/** Only a real document visit may negotiate or persist a preferred language.
 * RSC navigation/prefetch URLs must remain deterministic regardless of cookies.
 */
export function isLocaleDocumentRequest(headers: Pick<Headers, 'get'>): boolean {
  const destination = headers.get('sec-fetch-dest')
  if (destination && destination !== 'document') return false
  if (headers.get('rsc') === '1' || headers.get('next-router-prefetch') === '1') return false
  if (/prefetch/i.test(`${headers.get('purpose') ?? ''} ${headers.get('sec-purpose') ?? ''}`)) return false
  return true
}
