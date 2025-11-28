import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '../types';

// md/mdx文件目录
const postsDirectory = path.join(process.cwd(), 'data', 'posts');

// 递归查找所有 .md 和 .mdx 文件
function getAllPostFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllPostFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// 获取所有文章的slug
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = getAllPostFiles(postsDirectory);
  const slugs: string[] = [];

  files.forEach(filePath => {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      // 优先使用 frontmatter 中的 slug，否则使用文件路径
      if (data.slug) {
        slugs.push(data.slug);
      } else {
        // 从文件路径生成 slug
        const relativePath = path.relative(postsDirectory, filePath);
        const slug = relativePath
          .replace(/\.(md|mdx)$/, '')
          .replace(/[\/\\]/g, '-');
        slugs.push(slug);
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }
  });

  return slugs;
}

// 根据slug获取文章
export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const files = getAllPostFiles(postsDirectory);

  for (const filePath of files) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // 检查 frontmatter 中的 slug 是否匹配
      const fileSlug = data.slug || path.relative(postsDirectory, filePath)
        .replace(/\.(md|mdx)$/, '')
        .replace(/[\/\\]/g, '-');

      if (fileSlug === slug) {
        return {
          id: data.id,
          title: data.title,
          date: data.date,
          readTime: data.readTime,
          excerpt: data.excerpt,
          tags: data.tags || [],
          content: content.trim(),
          slug: fileSlug
        } as BlogPost;
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }
  }

  return null;
}

// 获取所有文章
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = getAllPostFiles(postsDirectory);
  const posts: BlogPost[] = [];

  files.forEach(filePath => {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      const fileSlug = data.slug || path.relative(postsDirectory, filePath)
        .replace(/\.(md|mdx)$/, '')
        .replace(/[\/\\]/g, '-');

      posts.push({
        id: data.id,
        title: data.title,
        date: data.date,
        readTime: data.readTime,
        excerpt: data.excerpt,
        tags: data.tags || [],
        content: content.trim(),
        slug: fileSlug
      } as BlogPost);
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }
  });

  // 按日期排序（降序）
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

