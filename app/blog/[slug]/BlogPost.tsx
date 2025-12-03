import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
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
    <div className="max-w-4xl mx-auto">
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
          <h1 className="text-4xl md:text-4xl font-black uppercase leading-none">{post.title}</h1>
        </div>

        <div className="prose prose-xl prose-black max-w-none font-medium markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 border-l-4 border-yellow-400 pl-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
              p: ({ node, children, ...props }: any) => {
                // 检查 AST 节点中是否包含代码块（非 inline）
                // ReactMarkdown 不应该将代码块包裹在 p 中，但如果发生了，我们需要处理
                const hasCodeBlock = node?.children?.some(
                  (child: any) => child.type === 'code' && !child.data?.hProperties?.inline
                );

                // 也检查 children 中是否有 pre 元素（通过检查 React 元素）
                const childrenArray = React.Children.toArray(children);
                const hasPreElement = childrenArray.some((child: any) => {
                  if (React.isValidElement(child)) {
                    return child.type === 'pre' ||
                      (typeof child.type === 'function' && child.type.name === 'pre');
                  }
                  return false;
                });

                if (hasCodeBlock || hasPreElement) {
                  return <>{children}</>;
                }

                return <p className="mb-4 text-lg leading-relaxed" {...props}>{children}</p>;
              },
              blockquote: ({ children }) => <blockquote className="bg-gray-100 p-4 border-l-4 border-black italic my-4">{children}</blockquote>,
              ul: ({ children }) => <ul className="ml-4 list-disc mb-4">{children}</ul>,
              ol: ({ children }) => <ol className="ml-4 list-decimal mb-4">{children}</ol>,
              li: ({ children }) => <li className="font-bold mb-2">{children}</li>,
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
                  <table className="w-full border-collapse text-left">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-yellow-200 border-b-2 border-black uppercase tracking-wider text-sm">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => (
                <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-neutral-50">
                  {children}
                </tbody>
              ),
              tr: ({ children }) => (
                <tr className="border-b border-black last:border-b-0">
                  {children}
                </tr>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-base font-black border-r border-black last:border-r-0">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 text-sm font-semibold border-r border-black last:border-r-0">
                  {children}
                </td>
              ),
              pre: ({ children, ...props }: any) => {
                // 如果 children 已经是 SyntaxHighlighter 渲染的内容，直接返回
                // 否则使用默认样式
                return <>{children}</>;
              },
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');

                if (!inline && match) {
                  return (
                    <div className="my-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                      <SyntaxHighlighter
                        style={oneLight}
                        language={match[1]}
                        showLineNumbers
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          background: '#ffffff',
                          borderRadius: 0,
                          padding: '1.5rem',
                          fontSize: '0.875rem',
                          lineHeight: '1.5',
                        }}
                        codeTagProps={{
                          style: {
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                          }
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                return (
                  <code className="bg-gray-100 px-1 py-0.5 rounded border border-black text-sm font-mono" {...props}>
                    {children}
                  </code>
                );
              },
              img: ({ src, alt, ...props }: any) => {
                // 直接使用图片路径，不需要添加 basePath
                let imageSrc = src;
                return (
                  <img
                    src={imageSrc}
                    alt={alt}
                    className="w-full h-auto my-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    {...props}
                  />
                );
              },
              a: ({ href, children }) => (
                <a href={href} className="text-blue-600 hover:underline font-bold whitespace-wrap break-words" target="_blank" rel="noopener noreferrer">
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

