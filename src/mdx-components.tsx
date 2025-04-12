import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use the custom components passed through props
    ...components,
    // Override default components with custom ones
    a: ({ href, children }) => (
      <Link href={href || ''} className="text-blue-600 hover:underline">
        {children}
      </Link>
    ),
    img: ({ src, alt }) => (
      <div className="relative w-full h-64 my-8">
        {src && (
          <Image
            src={src}
            alt={alt || ''}
            fill
            className="object-cover rounded-lg"
          />
        )}
      </div>
    ),
    // Add custom styles to default elements
    h1: (props) => (
      <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
    ),
    p: (props) => (
      <p className="my-4 leading-relaxed" {...props} />
    ),
    ul: (props) => (
      <ul className="list-disc list-inside my-4 space-y-2" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal list-inside my-4 space-y-2" {...props} />
    ),
    code: (props) => (
      <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1" {...props} />
    ),
    pre: (props) => (
      <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 my-4 overflow-x-auto" {...props} />
    ),
    blockquote: (props) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic" {...props} />
    ),
  };
}
