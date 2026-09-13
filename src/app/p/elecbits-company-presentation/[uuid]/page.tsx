import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// The actual HTML is served directly via Next.js rewrite in next.config.ts
// for the valid UUID. This page only catches invalid UUIDs -> 404.
const VALID_TOKEN = 'b75d3200-7979-4e85-8b08-154bd34ae22a';

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Elecbits - Company Presentation',
    description: 'A full stack ESDM, Powered by XOR',
    openGraph: {
      title: 'Elecbits - Company Presentation',
      description: 'A full stack ESDM, Powered by XOR',
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
      title: 'Elecbits - Company Presentation',
      description: 'A full stack ESDM, Powered by XOR',
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

export default async function ElecbitsPresentation({ params }: PageProps) {
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
