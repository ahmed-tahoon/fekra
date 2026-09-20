/** Keep technology names and numeric runs in their natural order inside RTL copy. */
export function BidiText({ children }: { children: string | null | undefined }) {
  if (!children) return null
  return children
    .split(/(\.?[A-Za-z0-9][A-Za-z0-9.+#%]*(?:[ /&-]+\.?[A-Za-z0-9][A-Za-z0-9.+#%]*)*)/g)
    .map((part, index) =>
      index % 2 ? (
        <bdi key={index} dir="ltr">
          {part}
        </bdi>
      ) : (
        part
      ),
    )
}
