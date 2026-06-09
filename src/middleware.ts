import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Section 11 + 18 — locale negotiation + redirect to a prefixed path.
export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
