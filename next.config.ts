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
      {
        // Serve growth pipeline HTML directly so phone/responsive CSS owns the viewport
        source: '/p/elecbits-growth-pipeline/ee4f865b-044f-432d-8149-e947169f6a03/',
        destination: '/elecbits-growth-pipeline.html',
      },
      {
        // Serve business plan HTML directly so the model owns the viewport
        source: '/p/elecbits-business-plan/2e85dc86-8372-4275-9af8-9f0deb2046a1/',
        destination: '/elecbits-business-plan.html',
      },
    ];
  },
};

export default nextConfig;
