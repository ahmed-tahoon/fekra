'use client'

import { useRef, useState, type FormEvent } from 'react'
import { applicationSchema, contactSchema, consultationSchema, newsletterSchema, validateCv } from '@/lib/validation'

export function useFormValidation(kind: 'contact' | 'consultation' | 'application' | 'newsletter', extraFields: readonly string[] = [], jobId?: string | number) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [valid, setValid] = useState(false)
  const touched = useRef(new Set<string>())
  function validate(form: HTMLFormElement, field?: string) {
    const values = Object.fromEntries(new FormData(form))
    const schema = { contact: contactSchema, consultation: consultationSchema, application: applicationSchema, newsletter: newsletterSchema }[kind]
    const parsed = schema.safeParse({ ...values, consent: values.consent === 'on', jobId })
    const next: Record<string, string> = {}
    if (!parsed.success) for (const issue of parsed.error.issues) {
      const name = String(issue.path[0])
      next[name] = name === 'email' ? 'email' : name === 'phone' ? 'phone' : name === 'linkedin' ? 'url' : 'required'
    }
    for (const key of extraFields) if (!String(values[key] ?? '').trim()) next[key] = 'required'
    if (kind === 'application') {
      const cv = values.cv
      const problem = cv instanceof File && cv.size ? validateCv(cv) : 'required'
      if (problem) next.cv = problem
    }
    if (field) touched.current.add(field)
    setValid(Object.keys(next).length === 0)
    setErrors(Object.fromEntries(Object.entries(next).filter(([key]) => !field || touched.current.has(key))))
    return Object.keys(next).length === 0
  }
  const onFieldEvent = (event: FormEvent<HTMLFormElement>) => {
    const control = event.target as HTMLInputElement
    if (control.name && !control.name.startsWith('bot')) validate(event.currentTarget, control.name)
  }
  return { errors, setErrors, valid, validate, onFieldEvent }
}
