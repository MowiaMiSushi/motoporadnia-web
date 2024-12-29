'use client';

import { useState, useEffect } from 'react';

interface YouTubeVideoProps {
  videoId: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

export default function YouTubeVideo({ videoId, loading = 'lazy', className = '' }: YouTubeVideoProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className={`aspect-video bg-gray-200 ${className}`} />;
  }

  return (
    <iframe
      className={className}
      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading={loading}
    />
  );
} 