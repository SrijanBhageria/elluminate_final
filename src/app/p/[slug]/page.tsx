import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PrivateDocumentGate from '../../../components/PrivateDocumentGate';
import { findLink, NO_INDEX } from '../../../lib/privateLinks';

// /p/<slug>/ (no secret): email gate around the document. Links come from /private-links.json.
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const link = findLink(slug);
  return { title: link?.title, robots: NO_INDEX };
}

export default async function PrivateDocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const link = findLink(slug);
  if (!link) {
    notFound();
  }

  return (
    <PrivateDocumentGate documentId={link.slug} documentTitle={link.title}>
      <iframe
        src={`/${link.file}`}
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title={link.title}
      />
    </PrivateDocumentGate>
  );
}
