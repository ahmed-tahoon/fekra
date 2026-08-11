'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/Button'

/** 21.11 — the user sees a generic message; the digest is what support needs. */
export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Page error', error.digest ?? error.message)
  }, [error])

  return (
    <div className="section">
      <div className="container-site flex min-h-[50dvh] flex-col items-center justify-center text-center">
        <h1 className="text-4xl">Something went wrong</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          We hit an unexpected error. Please try again.
        </p>
        {error.digest ? <p className="mt-2 text-xs text-muted-foreground">Reference: {error.digest}</p> : null}
        <Button onClick={reset} size="lg" className="mt-8">
          Try again
        </Button>
      </div>
    </div>
  )
}
