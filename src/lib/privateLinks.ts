/**
 * Private investor-document links, all defined in /private-links.json.
 *
 *   https://www.elluminate.in/p/<slug>/<secret>/  -> serves public/<file> directly
 *   https://www.elluminate.in/p/<slug>/           -> email gate around the same file
 *
 * Social-preview bots (WhatsApp, LinkedIn, Slack...) hitting the secret URL get a
 * tiny preview page built from the title / description / logo below instead of
 * the multi-MB document (see src/middleware.ts and src/app/link-preview).
 */
import data from '../../private-links.json';

export interface PrivateLink {
  slug: string;
  secret: string;
  file: string;
  title: string;
  description: string;
  brand: string;
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  logoType: string;
}

export const SITE_URL = 'https://www.elluminate.in';

export const PRIVATE_LINKS: PrivateLink[] = data.links;

export function findLink(slug: string): PrivateLink | undefined {
  return PRIVATE_LINKS.find((link) => link.slug === slug);
}

export function shareUrl(link: PrivateLink): string {
  return `${SITE_URL}/p/${link.slug}/${link.secret}/`;
}

export function logoUrl(link: PrivateLink): string {
  return `${SITE_URL}/${link.logo}`;
}

export const NO_INDEX = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: { index: false, follow: false },
};
