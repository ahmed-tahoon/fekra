import Link from 'next/link';

// Global fallback for routes outside any locale. Needs its own html/body
// because it can render above the [locale] layout.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          gap: '0.5rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', margin: 0 }}>404 — Page not found</h1>
        <Link href="/en">Go to homepage</Link>
      </body>
    </html>
  );
}
