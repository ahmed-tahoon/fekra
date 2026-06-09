import type { ReactNode } from 'react';

// Pass-through root layout. The real <html>/<body> live in [locale]/layout.tsx
// so lang + dir can follow the active locale. Required because a root
// not-found.tsx exists.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
