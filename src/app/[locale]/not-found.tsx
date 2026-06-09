import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-muted-foreground">404</p>
      <h1 className="mt-4 text-2xl font-semibold">{t('title')}</h1>
      <p className="mt-2 text-muted-foreground">{t('body')}</p>
      <ButtonLink href="/" className="mt-6">
        {t('cta')}
      </ButtonLink>
    </Container>
  );
}
