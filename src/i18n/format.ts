/**
 * Interpolation for dictionary strings. Lives outside `getDictionary` because
 * that module is server-only and client components need this too.
 *
 *   t(dict.blog.resultCount, { count: 12 })  ->  "12 articles"
 */
export function t(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => String(values[key] ?? match))
}
