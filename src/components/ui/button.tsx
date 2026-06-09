import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';
import type { ComponentProps } from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  outline: 'border border-border bg-transparent hover:bg-muted',
  ghost: 'hover:bg-muted',
} as const;

const sizes = {
  sm: 'h-9 px-3',
  md: 'h-11 px-5',
  lg: 'h-12 px-7 text-base',
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ComponentProps<'button'> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
