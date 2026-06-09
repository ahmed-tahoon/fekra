'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

// Section 11.6 — accessible light/dark toggle.
export function ThemeToggle() {
  const t = useTranslations('Nav');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={t('toggleTheme')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {/* Render a neutral icon until mounted to avoid hydration mismatch. */}
      <span aria-hidden className="text-base leading-none">
        {!mounted ? '◐' : isDark ? '☀' : '☾'}
      </span>
    </Button>
  );
}
