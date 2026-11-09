import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PRIVATE_LINKS } from './lib/privateLinks';

/**
 * Private links (all defined in /private-links.json):
 *
 * 1. Social scrapers (WhatsApp/iMessage/etc.) often fail on multi-MB HTML decks and
 *    keep a cached domain fallback. On a valid /p/<slug>/<secret>/ URL they get a tiny
 *    preview page (src/app/link-preview) instead; humans still get the full document
 *    via the rewrite in next.config.ts.
 * 2. The preview pages themselves are not reachable directly.
 * 3. Typing the raw file path (www.elluminate.in/<file>.html) into a browser returns 404,
 *    so the document only opens through its secret link (or the email-gate page, which
 *    loads it in an iframe).
 */
const SOCIAL_BOT_UA =
  /facebookexternalhit|Facebot|Twitterbot|WhatsApp|Slackbot|LinkedInBot|Discordbot|TelegramBot|SkypeUriPreview|Googlebot|bingbot|Applebot|Slack-ImgProxy|Viber|Iframely|Embedly|Quora Link Preview|Showyoubot|Outbrain|Pinterest|redditbot|vkShare|W3C_Validator/i;

const SECRET_URL = /^\/p\/([^/]+)\/([^/]+)\/?$/;

function notFound() {
  return new NextResponse('Not found', { status: 404 });
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/link-preview')) {
    return notFound();
  }

  const secretMatch = path.match(SECRET_URL);
  if (secretMatch) {
    const [, slug, secret] = secretMatch;
    const link = PRIVATE_LINKS.find((l) => l.slug === slug);
    const ua = request.headers.get('user-agent') ?? '';
    if (link && link.secret === secret && SOCIAL_BOT_UA.test(ua)) {
      const url = request.nextUrl.clone();
      url.pathname = `/link-preview/${link.slug}/`;
      url.search = '';
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Direct browser visit to a private document's raw file.
  const file = path.slice(1);
  if (
    PRIVATE_LINKS.some((l) => l.file === file) &&
    request.headers.get('sec-fetch-dest') === 'document'
  ) {
    return notFound();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/p/:path*', '/link-preview/:path*', '/:name([\\w.-]+\\.html)'],
};
