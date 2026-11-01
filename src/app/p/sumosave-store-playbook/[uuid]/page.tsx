import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// The actual HTML is served directly via Next.js rewrite in next.config.ts
// for the valid UUID. This page only catches invalid UUIDs -> 404.
const VALID_TOKEN = '678a69ea-c3bd-426e-ae81-07b361ac7c2f';

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'SumoSave Store Playbook',
    description:
      'Neighbourhood grocery store playbook — standardised formats, repeat purchasing and maturity-led economics across twenty-nine SumoSave stores.',
    openGraph: {
      title: 'SumoSave Store Playbook',
      description:
        'Neighbourhood grocery store playbook — standardised formats, repeat purchasing and maturity-led economics across twenty-nine SumoSave stores.',
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
      title: 'SumoSave Store Playbook',
      description:
        'Neighbourhood grocery store playbook — standardised formats, repeat purchasing and maturity-led economics across twenty-nine SumoSave stores.',
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

export default async function SumoSaveStorePlaybookPrivate({ params }: PageProps) {
  const { uuid } = await params;

  if (uuid !== VALID_TOKEN) {
    notFound();
  }

  notFound();
}
