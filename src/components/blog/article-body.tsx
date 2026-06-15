import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Link } from '@/i18n/routing';

/**
 * Renders the markdown body with GitHub-flavoured markdown, auto-slugged
 * headings (so the table of contents can link to them), and Tailwind Typography
 * styling tuned to the Fekra brand.
 */
export function ArticleBody({ content }: { content: string }) {
  return (
    <div
      className={[
        'prose prose-lg prose-slate max-w-[72ch] dark:prose-invert',
        'prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white',
        '[&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28 prose-h2:mt-14 prose-h2:text-[2rem] sm:prose-h2:text-[2.2rem] prose-h3:text-[1.5rem] sm:prose-h3:text-[1.7rem]',
        'prose-p:text-[1.075rem] sm:prose-p:text-[1.1875rem] prose-p:leading-[1.9] prose-p:text-slate-700 dark:prose-p:text-slate-300',
        'prose-a:font-semibold prose-a:text-[#2f7fb0] prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-slate-900 dark:prose-strong:text-white',
        'prose-li:text-[1.05rem] sm:prose-li:text-[1.15rem] prose-li:leading-[1.8] prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-li:marker:text-[#489bc2]',
        'prose-blockquote:border-s-4 prose-blockquote:border-[#489bc2] prose-blockquote:bg-[#489bc2]/[0.06] prose-blockquote:rounded-e-2xl prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:text-[1.12rem] prose-blockquote:leading-8 prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-200',
        'prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-medium prose-code:before:content-[""] prose-code:after:content-[""] dark:prose-code:bg-white/10',
        'prose-pre:rounded-2xl prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-50 prose-pre:text-slate-800 dark:prose-pre:border-white/10 dark:prose-pre:bg-white/[0.04] dark:prose-pre:text-slate-200',
        'prose-table:overflow-hidden prose-table:rounded-xl prose-th:bg-slate-50 prose-th:text-slate-700 dark:prose-th:bg-white/[0.06] dark:prose-th:text-slate-200 prose-td:align-top',
        'prose-img:rounded-2xl prose-img:shadow-md',
      ].join(' ')}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          a({ href, children, ...props }) {
            const target = href ?? '#';
            if (target.startsWith('/')) {
              return (
                <Link href={target} {...(props as Record<string, unknown>)}>
                  {children}
                </Link>
              );
            }
            return (
              <a href={target} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
