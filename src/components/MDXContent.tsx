'use client';

interface MDXContentProps {
  children: React.ReactNode;
}

export default function MDXContent({ children }: MDXContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {children}
    </div>
  );
}
