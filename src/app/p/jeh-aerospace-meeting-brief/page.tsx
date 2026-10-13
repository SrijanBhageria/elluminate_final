import { Metadata } from 'next';
import PrivateDocumentGate from '../../../components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'Jeh Aerospace Meeting Brief',
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

export default function JehAerospaceMeetingBrief() {
  return (
    <PrivateDocumentGate
      documentId="jeh-aerospace-meeting-brief"
      documentTitle="Jeh Aerospace Meeting Brief"
    >
      <iframe
        src="/jeh-aerospace-meeting-brief.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="Jeh Aerospace Meeting Brief"
      />
    </PrivateDocumentGate>
  );
}
