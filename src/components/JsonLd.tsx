/**
 * Structured data is server-rendered into the HTML so crawlers that do not run
 * JavaScript still see it (19.2).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Only `<` is escaped — JSON-LD must stay valid JSON.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
