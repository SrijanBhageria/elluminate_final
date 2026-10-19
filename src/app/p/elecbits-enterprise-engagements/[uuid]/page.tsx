import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// The actual HTML is served directly via Next.js rewrite in next.config.ts
// for the valid UUID. This page only catches invalid UUIDs -> 404.
const VALID_TOKEN = 'b1d938f4-db46-4b6b-8254-51e6f354b0ea';

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Elecbits: Enterprise Engagements',
    description: 'Three enterprise accounts · position as at 19 October 2026.',
    openGraph: {
      title: 'Elecbits: Enterprise Engagements',
      description: 'Three enterprise accounts · position as at 19 October 2026.',
      type: 'website',
      images: [
        {
          url: 'https://www.elluminate.in/elecbits-logo.png',
          width: 1024,
          height: 518,
          alt: 'Elecbits Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Elecbits: Enterprise Engagements',
      description: 'Three enterprise accounts · position as at 19 October 2026.',
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

export default async function ElecbitsEnterpriseEngagementsPrivate({ params }: PageProps) {
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
