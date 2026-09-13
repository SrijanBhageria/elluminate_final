import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async rewrites() {
    return [
      {
        // Serve the deck HTML directly so it owns the viewport (no iframe)
        source: '/p/elecbits-company-presentation/b75d3200-7979-4e85-8b08-154bd34ae22a/',
        destination: '/elecbits-presentation.html',
      },
    ];
  },
};

export default nextConfig;
