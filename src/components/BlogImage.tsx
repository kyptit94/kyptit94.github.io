'use client';

import React from 'react';
import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

const BlogImage: React.FC<BlogImageProps> = ({ src, alt, priority, className }) => {
  const [isError, setIsError] = React.useState(false);

  if (isError) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        onError={() => setIsError(true)}
      />
    </div>
  );
};

export default BlogImage;
