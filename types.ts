export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string; // Markdown content
  readTime: string;
  tags: string[];
  slug: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
}