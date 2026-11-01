import { Metadata } from 'next';
import PrivateDocumentGate from '../../../components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'SumoSave Store Playbook',
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
      documentTitle="SumoSave Store Playbook"
    >
      <iframe
        src="/sumosave-store-playbook.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="SumoSave Store Playbook"
      />
    </PrivateDocumentGate>
  );
}
