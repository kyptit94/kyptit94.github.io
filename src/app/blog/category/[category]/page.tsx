import { getBlogCategories, getBlogPostsByCategory } from '@/lib/blog';
import BlogCategories from '@/components/BlogCategories';
import BlogList from '@/components/BlogList';

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categories = await getBlogCategories();
  const posts = await getBlogPostsByCategory(params.category);

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 sm:px-8 md:px-12">
      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {params.category.charAt(0).toUpperCase() + params.category.slice(1)}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Browse articles in the {params.category} category
        </p>
      </header>

      {/* Categories */}
      <BlogCategories categories={categories} activeCategory={params.category} />

      {/* Blog Posts Grid */}
      <div className="h-[80vh]">
        <BlogList initialPosts={posts} />
      </div>
    </div>
  );
}
