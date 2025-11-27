import BlogListClient from './BlogListClient';
import { CONTENT } from '../../data/content';

type BlogClientProps = {
  content: typeof CONTENT;
};

export default function BlogClient({ content }: BlogClientProps) {
  return <BlogListClient content={content} />;
}

