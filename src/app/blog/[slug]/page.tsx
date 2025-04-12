import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ClientImage from '@/components/ClientImage';
import { compileMDX } from 'next-mdx-remote/rsc';
import MDXContent from '@/components/MDXContent';
import PageTitle from '@/components/PageTitle';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: true }
  });

  return (
    <article className="max-w-4xl mx-auto px-6 py-24 sm:px-8 md:px-12">
      <PageTitle title={post.title} />
      
      {/* Post Header */}
      <header className="mb-12">
        {post.coverImage && (
          <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <ClientImage
              src={post.coverImage}
              alt={post.title}
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {post.description}
          </p>
          <time className="block text-gray-500 dark:text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>

      {/* Post Content */}
      <MDXContent>
        {content}
      </MDXContent>
    </article>
  );
}
