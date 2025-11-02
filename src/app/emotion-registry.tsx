'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/cache';

type RegistryProps = {
  children: ReactNode;
};

// Client-side Emotion cache for static export
// useServerInsertedHTML is not available in static export mode
export default function EmotionRegistry({ children }: RegistryProps) {
  const [cache] = useState<EmotionCache>(() => {
    const emotionCache = createCache({
      key: 'mui',
      prepend: true,
    });
    return emotionCache;
  });

  // For static export, styles are injected client-side only
  useEffect(() => {
    // Styles will be injected automatically by Emotion
    // This effect ensures the cache is properly initialized
  }, [cache]);

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

