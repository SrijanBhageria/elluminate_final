import { Metadata } from 'next';
import PrivateDocumentGate from '../../../components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'Elecbits <> Xponentia 13.10.26',
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

export default function ElecbitsXponentiaMeetingTracker() {
  return (
    <PrivateDocumentGate
      documentId="elecbits-xponentia-meeting-tracker"
      documentTitle="Elecbits <> Xponentia 13.10.26"
    >
      <iframe
        src="/elecbits-xponentia-meeting-tracker.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="Elecbits <> Xponentia 13.10.26"
      />
    </PrivateDocumentGate>
  );
}
