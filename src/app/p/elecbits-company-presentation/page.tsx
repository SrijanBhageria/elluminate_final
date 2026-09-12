import { Metadata } from 'next';
import PrivateDocumentGate from '../../../components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'Elecbits - Company Presentation',
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

export default function ElecbitsPresentation() {
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
