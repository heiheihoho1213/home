import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { NeoButton } from '../../../components/NeoButton';
import { NeoCard } from '../../../components/NeoCard';
import { BlogPost as BlogPostType } from '../../../types';
import { TRANSLATIONS } from '@/data/translations';

type BlogPostClientProps = {
  post: BlogPostType | null;
};

export default function BlogPost({ post }: BlogPostClientProps) {
  const t = TRANSLATIONS['en'];

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <p className="text-2xl font-bold uppercase">{t.blog_no_results}</p>
        <Link href="/blog">
          <NeoButton className="mt-6" variant="secondary">
            {t.blog_back}
          </NeoButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto">
      <Link href="/blog">
        <NeoButton variant="secondary" className="mb-8">
          {t.blog_back}
        </NeoButton>
      </Link>
      <NeoCard className="p-8 md:p-12 bg-white">
        <div className="border-b-4 border-black pb-6 mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
            <span>{post.date}</span>
            <span>•</span>
            <span>
              {post.readTime} {t.blog_read_time}
            </span>
            <span className="hidden sm:inline">•</span>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-yellow-200 border border-black px-1.5 py-0.5 text-[10px] text-black">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-none">{post.title}</h1>
        </div>

        <div className="prose prose-xl prose-black max-w-none font-medium markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 border-l-4 border-yellow-400 pl-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
              p: ({ children }) => <p className="mb-4 text-lg leading-relaxed">{children}</p>,
              blockquote: ({ children }) => <blockquote className="bg-gray-100 p-4 border-l-4 border-black italic my-4">{children}</blockquote>,
              ul: ({ children }) => <ul className="ml-4 list-disc mb-4">{children}</ul>,
              ol: ({ children }) => <ol className="ml-4 list-decimal mb-4">{children}</ol>,
              li: ({ children }) => <li className="font-bold mb-2">{children}</li>,
              code: ({ inline, className, children, ...props }: any) => {
                if (inline) {
                  return (
                    <code className="bg-gray-100 px-1 py-0.5 rounded border border-black text-sm font-mono" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-black text-white p-4 border-4 border-black my-4 overflow-x-auto">
                    <code className="text-sm font-mono" {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
              a: ({ href, children }) => (
                <a href={href} className="text-blue-600 hover:underline font-bold" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              strong: ({ children }) => <strong className="font-black">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </NeoCard>
    </div>
  );
}

