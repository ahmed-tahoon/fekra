import Image from 'next/image';
import { categoryTheme } from './category-style';

/**
 * Article cover. Uses a real image when provided, otherwise renders a clean
 * branded gradient panel (coloured per category) so cards never show a broken
 * image and the grid stays visually consistent.
 */
export function Cover({
  category,
  title,
  image,
  className = '',
  priority = false,
}: {
  category: string;
  title: string;
  image?: string;
  className?: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={image} alt={title} fill priority={priority} sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
      </div>
    );
  }

  const theme = categoryTheme(category);
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} ${className}`}>
      {/* dotted texture */}
      <div
        aria-hidden
        className={`absolute inset-0 ${theme.dot} [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px] opacity-60`}
      />
      {/* soft glare */}
      <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
      {/* big faded category word */}
      <span aria-hidden className="absolute -bottom-3 start-3 select-none text-6xl font-black uppercase tracking-tight text-white/15">
        {category}
      </span>
      {/* Fekra mark */}
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <span className="text-balance text-lg font-bold leading-snug text-white/95 drop-shadow-sm">{title}</span>
      </div>
    </div>
  );
}
