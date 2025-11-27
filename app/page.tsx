import { CONTENT } from '../data/content';
import { getAllPosts } from '../lib/posts';
import HomeClient from './HomeClient';

export default async function Home() {
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

  return <HomeClient content={content} />;
}

