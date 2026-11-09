import { findLink, logoUrl, shareUrl } from '../../../lib/privateLinks';

/**
 * Tiny preview page for social scrapers (WhatsApp, LinkedIn, Slack, iMessage...).
 * Only reachable through src/middleware.ts, which rewrites bot requests for a valid
 * /p/<slug>/<secret>/ URL here. Everything comes from /private-links.json.
 */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const link = findLink(slug);
  if (!link) {
    return new Response('Not found', { status: 404 });
  }

  const url = shareUrl(link);
  const img = logoUrl(link);
  const title = esc(link.title);
  const description = esc(link.description);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:site_name" content="${esc(link.brand)}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(url)}">
  <meta property="og:image" content="${esc(img)}">
  <meta property="og:image:secure_url" content="${esc(img)}">
  <meta property="og:image:type" content="${esc(link.logoType)}">
  <meta property="og:image:width" content="${link.logoWidth}">
  <meta property="og:image:height" content="${link.logoHeight}">
  <meta property="og:image:alt" content="${esc(link.logoAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${esc(img)}">
  <meta http-equiv="refresh" content="0;url=/p/${link.slug}/${link.secret}/">
</head>
<body>
  <p><a href="/p/${link.slug}/${link.secret}/">Open ${title}</a></p>
</body>
</html>
`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Cache-Control': 'public, max-age=0, s-maxage=300',
    },
  });
}
