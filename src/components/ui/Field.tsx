'use client'

import { useId, type ComponentProps, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

const controlClass =
  'w-full rounded-card border border-input bg-card px-4 py-3 text-base text-foreground ' +
  'placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ' +
  'aria-[invalid=true]:border-[--color-danger-600]'

/**
 * One labelled control. The label is always a real <label for>, the error is
 * wired through aria-describedby and aria-invalid, and errors are announced —
 * that is 23.4 in a single component so no form can get it wrong.
 */
export function Field({
  label,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: (props: {
    id: string
    'aria-invalid': boolean
    'aria-describedby': string | undefined
    required?: boolean
    className: string
  }) => ReactNode
}) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-[--color-danger-600]" aria-hidden>
            {' *'}
          </span>
        ) : null}
      </label>

      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        required,
        className: controlClass,
      })}

      {hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-[--color-danger-600]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const Input = (props: ComponentProps<'input'>) => <input {...props} />
export const Textarea = (props: ComponentProps<'textarea'>) => <textarea rows={5} {...props} />
