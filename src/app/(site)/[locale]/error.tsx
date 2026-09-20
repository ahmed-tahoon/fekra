'use client'

import { useEffect } from 'react'

import { useLocaleStatus } from '@/components/LocaleStatusProvider'
import { Button } from '@/components/ui/Button'

/** 21.11 — the user sees a generic message; the digest is what support needs. */
export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const messages = useLocaleStatus().error
  useEffect(() => {
    console.error('Page error', error.digest ?? error.message)
  }, [error])

  return (
    <div className="section">
      <div className="container-site flex min-h-[50dvh] flex-col items-center justify-center text-center">
        <h1 className="text-4xl">{messages.title}</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          {messages.body}
        </p>
        {error.digest ? <p className="mt-2 text-xs text-muted-foreground">{messages.reference}: <bdi dir="ltr">{error.digest}</bdi></p> : null}
        <Button onClick={reset} size="lg" className="mt-8">
          {messages.retry}
        </Button>
      </div>
    </div>
  )
}
