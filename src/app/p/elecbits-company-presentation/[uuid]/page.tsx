import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PrivateDocumentGate from '@/components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'Elecbits - Company Presentation',
  description: 'A full stack ESDM, Powered by XOR',
  openGraph: {
    title: 'Elecbits - Company Presentation',
    description: 'A full stack ESDM, Powered by XOR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elecbits - Company Presentation',
    description: 'A full stack ESDM, Powered by XOR',
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

// Valid access token for this document
const VALID_TOKEN = 'b75d3200-7979-4e85-8b08-154bd34ae22a';

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function ElecbitsPresentation({ params }: PageProps) {
  const { uuid } = await params;
  
  // Verify the UUID token
  if (uuid !== VALID_TOKEN) {
    notFound();
  }

  return (
    <PrivateDocumentGate
      documentId="elecbits-company-presentation"
      documentTitle="Elecbits - Company Presentation"
    >
      <iframe
        src="/elecbits-presentation.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="Elecbits - Company Presentation"
      />
    </PrivateDocumentGate>
  );
}
