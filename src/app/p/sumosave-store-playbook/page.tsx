import { Metadata } from 'next';
import PrivateDocumentGate from '../../../components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'SumoSave — The Store Growth Playbook',
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

export default function SumoSaveStorePlaybook() {
  return (
    <PrivateDocumentGate
      documentId="sumosave-store-playbook"
      documentTitle="SumoSave — The Store Growth Playbook"
    >
      <iframe
        src="/sumosave-store-playbook.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="SumoSave — The Store Growth Playbook"
      />
    </PrivateDocumentGate>
  );
}
