import type { NextConfig } from "next";
import privateLinks from "./private-links.json";

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
    // Private investor links: /p/<slug>/<secret>/ serves public/<file> directly
    // so the document owns the viewport (no iframe). Defined in private-links.json.
    return privateLinks.links.map((link) => ({
      source: `/p/${link.slug}/${link.secret}/`,
      destination: `/${link.file}`,
    }));
  },
  async headers() {
    // Keep private documents out of search engines even if a URL leaks.
    const noIndex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }];
    return [
      { source: '/p/:path*', headers: noIndex },
      ...privateLinks.links.map((link) => ({ source: `/${link.file}`, headers: noIndex })),
    ];
  },
};

export default nextConfig;
