'use client';

import React from 'react';
import Image from 'next/image';

interface ClientImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function ClientImage(props: ClientImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(true);

  if (!isLoaded) {
    return null;
  }

  return (
    <Image
      {...props}
      alt={props.alt}
      fill
      onError={() => setIsLoaded(false)}
    />
  );
}
