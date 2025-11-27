import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import BlogPost from './BlogPost';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // slug 是文章名称
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found'
    };
  }

  return {
    title: `${post.title} | Heiheihoho's Portfolio`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://neo-brutalism.example.com/blog/${slug}`,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const posts = getAllPosts();
  const post = posts.find((post) => post.slug === slug) ?? null;
  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}

export async function generateStaticParams() {
  const slugs = getAllPosts().map(post => post.slug);
  const allSlugs = Array.from(new Set(slugs));

  return allSlugs.map(slug => ({ slug }));
}

