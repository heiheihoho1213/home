'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { NeoCard } from '../../components/NeoCard';
import { CONTENT } from '../../data/content';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../data/translations';

type BlogListClientProps = {
  content: typeof CONTENT;
};

export default function BlogListClient({ content }: BlogListClientProps) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const posts = content[language].blog;

  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts
      .toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return ['ALL', ...Array.from(tags)];
  }, [posts]);

  useEffect(() => {
    if (selectedTag !== 'ALL' && !allTags.includes(selectedTag)) {
      setSelectedTag('ALL');
    }
  }, [language, allTags, selectedTag]);

  const filteredPosts = useMemo(() => {
    const base = selectedTag === 'ALL' ? posts : posts.filter(post => post.tags.includes(selectedTag));
    return [...base].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedTag, posts]);

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-black uppercase mb-4">{t.blog_title}</h1>
          <div className="h-2 bg-black w-24 mx-auto mb-8" />

          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`
                  px-3 py-1 font-bold uppercase text-xs border-2 border-black transition-all duration-200
                  ${selectedTag === tag
                    ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] translate-x-[-2px] translate-y-[-2px]'
                    : 'bg-white text-black hover:bg-yellow-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'}
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      <div className="space-y-6 min-h-[50vh]">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
              <Link key={post.id || post.slug + '-' + index} href={`/blog/${post.slug}`} className="block">
                <NeoCard className="group cursor-pointer bg-white" hoverEffect>
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3 items-center text-xs font-bold uppercase tracking-wider text-gray-500">
                        <span className="bg-black text-white px-2 py-0.5">{post.date}</span>
                        <span className="py-0.5">{post.readTime}</span>
                        <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full mx-1" />
                        <div className="flex gap-2">
                          {post.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 border border-black px-1.5 py-0.5 text-[10px] text-black group-hover:bg-yellow-200 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black uppercase mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 font-medium md:w-3/4">{post.excerpt}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-yellow-300 group-hover:bg-yellow-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </NeoCard>
              </Link>
          ))
        ) : (
            <div className="text-center py-20 border-2 border-dashed border-gray-400 text-gray-500 font-bold uppercase">
              {t.blog_no_results} "{selectedTag}"
            </div>
        )}
      </div>
    </div>
  );
}

