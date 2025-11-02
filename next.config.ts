import type { NextConfig } from "next";
import { themeColors } from "./src/config/theme";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Generate static HTML files only
  images: {
    unoptimized: true, // Required for static export
    // domains: ['img.youtube.com'], // Deprecated in Next.js 13+
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
  // Theme colors are configured in src/config/theme.ts
  // Access via: import { themeColors } from './src/config/theme'
};

// Re-export theme colors for convenience
export const theme = {
  colors: themeColors,
};

export default nextConfig;
