import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// The actual HTML is served directly via Next.js rewrite in next.config.ts
// for the valid UUID. This page only catches invalid UUIDs -> 404.
const VALID_TOKEN = '3f52f803-0dab-449a-9b7f-f501b40b1ea6';

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jeh Aerospace Meeting Brief',
    description: 'Elluminate internal prep for meeting 2 with the Jeh Aerospace founders.',
    openGraph: {
      title: 'Jeh Aerospace Meeting Brief',
      description: 'Elluminate internal prep for meeting 2 with the Jeh Aerospace founders.',
      type: 'website',
      images: [
        {
          url: 'https://www.elluminate.in/usethis.png',
          width: 788,
          height: 272,
          alt: 'Elluminate',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Jeh Aerospace Meeting Brief',
      description: 'Elluminate internal prep for meeting 2 with the Jeh Aerospace founders.',
      images: ['https://www.elluminate.in/usethis.png'],
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

export default async function JehAerospaceMeetingBriefPrivate({ params }: PageProps) {
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
