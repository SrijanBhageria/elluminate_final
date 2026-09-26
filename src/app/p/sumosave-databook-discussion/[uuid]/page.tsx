import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// The actual HTML is served directly via Next.js rewrite in next.config.ts
// for the valid UUID. This page only catches invalid UUIDs -> 404.
const VALID_TOKEN = '9ba33c10-e35c-40b3-82fb-93049ecc22f0';

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'SumoSave Operating Review',
    description:
      'SumoSave operating review — network sales, margin, store economics, cohorts, P&L and store-by-store capital payback. Actuals to August 2026.',
    openGraph: {
      title: 'SumoSave Operating Review',
      description:
        'SumoSave operating review — network sales, margin, store economics, cohorts, P&L and store-by-store capital payback. Actuals to August 2026.',
      type: 'website',
      images: [
        {
          url: 'https://www.elluminate.in/sumosave-logo.png',
          width: 1200,
          height: 630,
          alt: 'SumoSave Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SumoSave Operating Review',
      description:
        'SumoSave operating review — network sales, margin, store economics, cohorts, P&L and store-by-store capital payback. Actuals to August 2026.',
      images: ['https://www.elluminate.in/sumosave-logo.png'],
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

export default async function SumoSaveDatabookDiscussionPrivate({ params }: PageProps) {
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
