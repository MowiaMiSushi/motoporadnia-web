'use client';

import { useState } from 'react';

interface YouTubeVideoProps {
  videoId: string;
}

export default function YouTubeVideo({ videoId }: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const loadVideo = () => {
    setIsLoaded(true);
  };

  if (!isLoaded) {
    return (
      <div 
        onClick={loadVideo}
        className="relative cursor-pointer w-full aspect-video bg-gray-100"
        role="button"
        aria-label="Załaduj film"
      >
        <img
          src={thumbnailUrl}
          alt="Miniatura filmu"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-600 rounded-full p-4 text-white">
            <svg 
              className="w-12 h-12" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full aspect-video"
    />
  );
} 