'use client'

import { useId, type ComponentProps, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

/*
 * Sized by the FORM's width, not the viewport's. The comp's control is a large
 * pill (text-lg, px-6 py-4) drawn at full container width; dropped into the
 * 380px sidebar on a job page it fills the card with padding and leaves no room
 * for the value. `@md:` reads the nearest `@container` ancestor — every form
 * root carries one — so a wide form keeps the comp's control and a narrow one
 * gets a proportionate version, with no per-form flag to pass down.
 */
const controlClass =
  'w-full rounded-[28px] border border-transparent bg-panel-grey px-4 py-3 text-base text-navy-800 ' +
  '@md:rounded-[32px] @md:px-6 @md:py-4 @md:text-lg ' +
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
