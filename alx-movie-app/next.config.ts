import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['m.media-amazon.com'], // ✅ Allow Amazon images
  },
};

export default nextConfig;
