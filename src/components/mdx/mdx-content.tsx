import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/i18n/routing';

/**
 * Server-rendered MDX (sections 9.4 / 15.3).
 * Wrapped in prose for readable article typography in both themes.
 */
const components = {
  a: (props: React.ComponentProps<'a'>) => {
    const href = props.href ?? '';
    if (href.startsWith('/')) {
      return <Link href={href}>{props.children}</Link>;
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
