'use client';

import { useEffect, useRef, useState } from 'react';
import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Fades + slides its content in the first time it scrolls into view. */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  variant = 'up',
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: 'up' | 'left' | 'right';
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variantClass = { up: '', left: 'reveal-left', right: 'reveal-right' }[variant];

  return (
    <Tag
      ref={ref}
      className={cn('reveal', variantClass, visible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
