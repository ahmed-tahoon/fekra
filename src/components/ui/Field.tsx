'use client'

import { useId, type ComponentProps, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

const controlClass =
  'w-full rounded-[32px] border border-transparent bg-panel-grey px-6 py-4 text-lg text-navy-800 ' +
  'placeholder:text-ink-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ' +
  'dark:bg-card dark:text-foreground dark:placeholder:text-muted-foreground ' +
  'aria-[invalid=true]:border-danger-600'

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
  hideLabel,
  children,
  className,
}: {
  label: string
  error?: string
  hint?: string
  required?: boolean
  /** Renders the cue inside the control, as the comp does. The label element
   *  remains for assistive tech — a placeholder is not a substitute (23.4). */
  hideLabel?: boolean
  className?: string
  children: (props: {
    id: string
    'aria-invalid': boolean
    'aria-describedby': string | undefined
    required?: boolean
    placeholder?: string
    className: string
  }) => ReactNode
}) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className={cn('text-sm font-medium text-foreground', hideLabel && 'sr-only')}>
        {label}
        {required ? (
          <span className="text-danger-600" aria-hidden>
            {' *'}
          </span>
        ) : null}
      </label>

      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        required,
        ...(hideLabel ? { placeholder: label } : {}),
        className: controlClass,
      })}

      {hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-danger-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const Input = (props: ComponentProps<'input'>) => <input {...props} />
export const Textarea = (props: ComponentProps<'textarea'>) => <textarea rows={5} {...props} />
