import { getBlogPosts, getBlogCategories } from '@/lib/blog';
import BlogCategories from '@/components/BlogCategories';
import BlogList from '@/components/BlogList';
import PageTitle from '@/components/PageTitle';

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const categories = await getBlogCategories();

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 sm:px-8 md:px-12">
      <PageTitle title="Blog & Insights" />
      
      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Blog & Insights
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Sharing my thoughts, experiences, and learnings about web development, technology, and programming.
        </p>
      </header>

      {/* Categories */}
      <BlogCategories categories={categories} />

      {/* Blog Posts Grid with Infinite Scroll */}
      <BlogList initialPosts={posts.slice(0, 6)} />
    </div>
  );
}
