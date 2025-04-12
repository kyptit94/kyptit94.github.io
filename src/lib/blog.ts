import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  category: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Create the blog directory if it doesn't exist
    try {
      await fs.access(BLOG_DIR);
    } catch {
      await fs.mkdir(BLOG_DIR, { recursive: true });
    }

    const files = await fs.readdir(BLOG_DIR);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async file => {
          const content = await fs.readFile(path.join(BLOG_DIR, file), 'utf8');
          const { data } = matter(content);
          const slug = file.replace(/\.mdx$/, '');

          return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            coverImage: data.coverImage,
            tags: data.tags,
            category: data.category || 'Uncategorized',
          };
        })
    );

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const content = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), 'utf8');
    const { data, content: rawContent } = matter(content);

    return {
      slug,
      title: data.title,
      date: data.date,
      content: rawContent,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      tags: data.tags,
      category: data.category || 'Uncategorized',
    };
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
  }
}

export async function getBlogCategories(): Promise<string[]> {
  const posts = await getBlogPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}
