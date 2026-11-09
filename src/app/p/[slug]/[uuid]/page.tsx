import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NO_INDEX } from '../../../../lib/privateLinks';

// The real /p/<slug>/<secret>/ URL is served by the rewrite in next.config.ts
// (straight to the HTML file in public/). Anything that reaches this page has a
// wrong slug or secret, so it 404s.
export const metadata: Metadata = { robots: NO_INDEX };

export default function WrongSecret() {
  notFound();
}
