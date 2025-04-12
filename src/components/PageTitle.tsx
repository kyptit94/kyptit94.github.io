'use client';

import { useEffect } from 'react';

interface PageTitleProps {
  title: string;
  baseTitle?: string;
}

export default function PageTitle({ title, baseTitle = "Kevin - Full Stack Developer Portfolio" }: PageTitleProps) {
  useEffect(() => {
    // Update the document title
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // Cleanup function to reset the title when component unmounts
    return () => {
      document.title = baseTitle;
    };
  }, [title, baseTitle]);

  // This component doesn't render anything
  return null;
}
