'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

// Section 11.2 — language switcher that preserves the current path.
export function LanguageSwitcher() {
  const t = useTranslations('Nav');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const current = params.locale as string;
  const next = current === 'ar' ? 'en' : 'ar';

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={t('switchLanguage')}
      onClick={() => router.replace(pathname, { locale: next })}
    >
      {t('switchLanguage')}
    </Button>
  );
}
