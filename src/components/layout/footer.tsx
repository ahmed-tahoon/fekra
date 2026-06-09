import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui/container';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Image
            src="/images/fekra-logo.webp"
            alt="Fekra"
            width={663}
            height={198}
            className="h-9 w-auto dark:[filter:brightness(0)_invert(1)]"
          />
          <p className="text-sm text-muted-foreground">{t('Meta.tagline')}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">{t('Footer.company')}</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-foreground">{t('Nav.about')}</Link></li>
            <li><Link href="/services" className="hover:text-foreground">{t('Nav.services')}</Link></li>
            <li><Link href="/careers" className="hover:text-foreground">{t('Nav.careers')}</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">{t('Footer.resources')}</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><Link href="/blog" className="hover:text-foreground">{t('Nav.blog')}</Link></li>
            <li><Link href="/fika" className="hover:text-foreground">{t('Nav.fika')}</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">{t('Nav.contact')}</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">{t('Footer.company')}</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-foreground">{t('Footer.privacy')}</Link></li>
            <li><Link href="/terms" className="hover:text-foreground">{t('Footer.terms')}</Link></li>
          </ul>
        </div>
      </Container>

      <Container className="border-t border-border py-6">
        <p className="text-xs text-muted-foreground">
          © {year} {t('Meta.siteName')}. {t('Footer.rights')}
        </p>
      </Container>
    </footer>
  );
}
