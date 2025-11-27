import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '../types';

// md文件目录
const postsDirectory = path.join(process.cwd(), 'data', 'posts');

// 获取所有文章的slug
export function getPostSlugs(): string[] {
  const langDir = path.join(postsDirectory);
  if (!fs.existsSync(langDir)) {
    return [];
  }
  return fs.readdirSync(langDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

// 根据slug获取文章
export function getPostBySlug(slug: string): BlogPost | null {
  const langDir = path.join(postsDirectory);
  const fullPath = path.join(langDir, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    id: data.id,
    title: data.title,
    date: data.date,
    readTime: data.readTime,
    excerpt: data.excerpt,
    tags: data.tags || [],
    content: content.trim(),
    slug: data.slug || slug
  } as BlogPost;
}

// 获取所有文章
export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      // Sort by date descending
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

