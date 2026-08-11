import Image from 'next/image'

import { mediaAlt, mediaUrl, type MediaDoc } from '@/components/blocks/types'

import { categoryTheme } from './theme'

/**
 * Article cover. Uses a real image when provided, otherwise renders a branded
 * gradient panel coloured per category, so cards never show a broken image and
 * the grid stays visually consistent (2.7 / 8.9).
 */
export function Cover({
  category,
  title,
  image,
  className = '',
  priority = false,
  sizes = '(min-width:1024px) 33vw, 100vw',
}: {
  category: string
  title: string
  image?: MediaDoc | null
  className?: string
  priority?: boolean
  sizes?: string
}) {
  if (image?.url) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={mediaUrl(image)}
          alt={mediaAlt(image) || title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    )
  }

  const theme = categoryTheme(category)

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} ${className}`}>
      {/* dotted texture */}
      <div
        aria-hidden
        className={`absolute inset-0 ${theme.dot} [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px] opacity-60`}
      />
      {/* soft glare */}
      <div aria-hidden className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
      {/* big faded category word */}
      <span
        aria-hidden
        className="absolute -bottom-3 start-3 text-6xl font-black tracking-tight text-white/15 uppercase select-none"
      >
        {category}
      </span>
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <span className="text-lg leading-snug font-bold text-balance text-white/95 drop-shadow-sm">{title}</span>
      </div>
    </div>
  )
}
