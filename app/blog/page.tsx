import { CONTENT } from '../../data/content';
import { getAllPosts } from '../../lib/posts';
import BlogClient from './BlogClient';

export default async function BlogPage() {
  // Fetch data at build time
  const blogPosts = getAllPosts();

  const content = {
    en: {
      ...CONTENT.en,
      blog: blogPosts.length > 0 ? blogPosts : CONTENT.en.blog
    },
    zh: {
      ...CONTENT.zh,
      blog: blogPosts.length > 0 ? blogPosts : CONTENT.zh.blog
    }
  };
  return <BlogClient content={content} />;
}

