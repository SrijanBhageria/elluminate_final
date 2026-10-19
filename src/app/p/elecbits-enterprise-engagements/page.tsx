import { Metadata } from 'next';
import PrivateDocumentGate from '../../../components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'Elecbits: Enterprise Engagements',
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

export default function ElecbitsEnterpriseEngagements() {
  return (
    <PrivateDocumentGate
      documentId="elecbits-enterprise-engagements"
      documentTitle="Elecbits: Enterprise Engagements"
    >
      <iframe
        src="/elecbits-enterprise-engagements.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="Elecbits: Enterprise Engagements"
      />
    </PrivateDocumentGate>
  );
}
