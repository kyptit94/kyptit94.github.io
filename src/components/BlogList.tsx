'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  coverImage: string;
  category: string;
  tags: string[];
  excerpt: string;
}

interface BlogListProps {
  initialPosts: Post[];
}

const POSTS_PER_PAGE = 6;

export default function BlogList({ initialPosts }: BlogListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const loadMorePosts = async () => {
      if (inView && !loading && hasMore) {
        setLoading(true);
        try {
          // Simulate API call with delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const nextPage = page + 1;
          const start = (nextPage - 1) * POSTS_PER_PAGE;
          const end = start + POSTS_PER_PAGE;
          
          // Replace this with your actual API call
          const response = await fetch(`/api/posts?page=${nextPage}`);
          const newPosts = await response.json();
          
          if (newPosts.length === 0) {
            setHasMore(false);
          } else {
            setPosts(prevPosts => [...prevPosts, ...newPosts]);
            setPage(nextPage);
          }
        } catch (error) {
          console.error('Error loading more posts:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadMorePosts();
  }, [inView, loading, hasMore, page]);

  return (
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl dark:shadow-gray-900/30"
        >
          {post.coverImage && (
            <div className="relative h-full w-full bg-gray-100 dark:bg-gray-800">
              <img
                src={post.coverImage}
                alt={post.title}
                className="object-cover h-full w-full transition-transform group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex-1 p-6">
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                {post.category}
              </span>
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-400 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>5 min read</span>
            </div>
          </div>
        </Link>
      ))}
      
      {/* Loading indicator */}
      <div
        ref={ref}
        className="col-span-full flex justify-center py-8"
      >
        {loading && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          </div>
        )}
      </div>
    </div>
  );
}
