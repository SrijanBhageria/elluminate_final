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
      {
        source: '/p/sumosave-databook-discussion/9ba33c10-e35c-40b3-82fb-93049ecc22f0/',
        destination: '/sumosave-databook-discussion.html',
      },
      {
        source: '/p/elecbits-xponentia-meeting-tracker/6980586b-5e77-4c22-9e7a-289a5e088408/',
        destination: '/elecbits-xponentia-meeting-tracker.html',
      },
      {
        source: '/p/jeh-aerospace-meeting-brief/3f52f803-0dab-449a-9b7f-f501b40b1ea6/',
        destination: '/jeh-aerospace-meeting-brief.html',
      },
    ];
  },
};

export default nextConfig;
