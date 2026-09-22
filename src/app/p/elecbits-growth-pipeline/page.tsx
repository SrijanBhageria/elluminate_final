import { Metadata } from 'next';
import PrivateDocumentGate from '../../../components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'Elecbits - Growth Pipeline',
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

export default function ElecbitsGrowthPipeline() {
  return (
    <PrivateDocumentGate
      documentId="elecbits-growth-pipeline"
      documentTitle="Elecbits - Growth Pipeline"
    >
      <iframe
        src="/elecbits-growth-pipeline.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="Elecbits - Growth Pipeline"
      />
    </PrivateDocumentGate>
  );
}
