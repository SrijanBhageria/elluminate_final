import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// The actual HTML is served directly via Next.js rewrite in next.config.ts
// for the valid UUID. This page only catches invalid UUIDs -> 404.
const VALID_TOKEN = '2e85dc86-8372-4275-9af8-9f0deb2046a1';

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Elecbits Business Plan',
    description: 'FY27–FY30 interactive business plan.',
    openGraph: {
      title: 'Elecbits Business Plan',
      description: 'FY27–FY30 interactive business plan.',
      type: 'website',
      images: [
        {
          url: 'https://www.elluminate.in/elecbits-logo.png',
          width: 1200,
          height: 630,
          alt: 'Elecbits Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Elecbits Business Plan',
      description: 'FY27–FY30 interactive business plan.',
      images: ['https://www.elluminate.in/elecbits-logo.png'],
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function ElecbitsBusinessPlanPrivate({ params }: PageProps) {
  const { uuid } = await params;

  // Any UUID that isn't the valid token -> 404
  // (The valid token is handled by the rewrite and never reaches here.)
  if (uuid !== VALID_TOKEN) {
    notFound();
  }

  // Fallback: should not normally be reached because the rewrite
  // intercepts the valid-token URL before Next.js routing.
  notFound();
}
