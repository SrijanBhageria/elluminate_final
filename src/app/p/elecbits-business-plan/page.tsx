import { Metadata } from 'next';
import PrivateDocumentGate from '../../../components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'Elecbits Business Plan',
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

export default function ElecbitsBusinessPlan() {
  return (
    <PrivateDocumentGate
      documentId="elecbits-business-plan"
      documentTitle="Elecbits Business Plan"
    >
      <iframe
        src="/elecbits-business-plan.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="Elecbits Business Plan"
      />
    </PrivateDocumentGate>
  );
}
