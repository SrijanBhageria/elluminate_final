import { Metadata } from 'next';
import PrivateDocumentGate from '../../../components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'SumoSave Databook Discussion',
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

export default function SumoSaveDatabookDiscussion() {
  return (
    <PrivateDocumentGate
      documentId="sumosave-databook-discussion"
      documentTitle="SumoSave Databook Discussion"
    >
      <iframe
        src="/sumosave-databook-discussion.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="SumoSave Databook Discussion"
      />
    </PrivateDocumentGate>
  );
}
