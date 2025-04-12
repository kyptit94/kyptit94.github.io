import Link from 'next/link';

interface BlogCategoriesProps {
  categories: string[];
  activeCategory?: string;
}

export default function BlogCategories({ categories, activeCategory }: BlogCategoriesProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/blog"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !activeCategory
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          All Posts
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog/category/${category.toLowerCase()}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.toLowerCase()
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
