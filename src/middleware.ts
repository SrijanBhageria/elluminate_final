import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Social scrapers (WhatsApp/iMessage/etc.) often fail on multi‑MB HTML decks and
 * keep a cached domain fallback. Serve them a tiny OG shell instead; humans still
 * get the full document via the next.config rewrite.
 */
const SOCIAL_BOT_UA =
  /facebookexternalhit|Facebot|Twitterbot|WhatsApp|Slackbot|LinkedInBot|Discordbot|TelegramBot|SkypeUriPreview|Googlebot|bingbot|Applebot|Slack-ImgProxy|Viber|Iframely|Embedly|Quora Link Preview|Showyoubot|Outbrain|Pinterest|redditbot|vkShare|W3C_Validator/i;

const PRIVATE_OG_SHELLS: Record<string, string> = {
  '/p/elecbits-growth-pipeline/ee4f865b-044f-432d-8149-e947169f6a03':
    '/og/elecbits-growth-pipeline.html',
  '/p/elecbits-growth-pipeline/ee4f865b-044f-432d-8149-e947169f6a03/':
    '/og/elecbits-growth-pipeline.html',
};

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';
  if (!SOCIAL_BOT_UA.test(ua)) {
    return NextResponse.next();
  }

  const shell = PRIVATE_OG_SHELLS[request.nextUrl.pathname];
  if (!shell) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = shell;
  url.search = '';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/p/elecbits-growth-pipeline/:uuid*'],
};
