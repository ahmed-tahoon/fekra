import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

const fieldBase =
  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30';

export function Label({ className, ...props }: ComponentProps<'label'>) {
  return <label className={cn('mb-1.5 block text-sm font-medium', className)} {...props} />;
}

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(fieldBase, 'min-h-32 resize-y', className)} {...props} />;
}

// Visually-hidden honeypot field (16.2).
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
      <label>
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
