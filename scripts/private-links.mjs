#!/usr/bin/env node
/**
 * Helper for private investor links (see PRIVATE_LINKS.md).
 *
 *   npm run links -- list                     all links with their shareable URLs
 *   npm run links -- check [--fix]            validate private-links.json; --fix fills logo size/type
 *   npm run links -- new-secret               print a fresh secret for a new link
 *   npm run links -- wrap <slug> <export.html>
 *        copy a raw Claude HTML export into public/<file> for that link, adding the
 *        page skeleton, noindex and title/description/preview tags from private-links.json.
 *        The export's own content is kept as-is.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = join(ROOT, 'private-links.json');
const PUBLIC = join(ROOT, 'public');
const SITE = 'https://www.elluminate.in';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const FILE = /^[\w.-]+\.html$/;

const load = () => JSON.parse(readFileSync(CONFIG, 'utf8'));
const save = (cfg) => writeFileSync(CONFIG, JSON.stringify(cfg, null, 2) + '\n');
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const shareUrl = (l) => `${SITE}/p/${l.slug}/${l.secret}/`;

/** Width/height/type of a PNG, JPEG, GIF or WebP, read from the file header. */
function imageInfo(path) {
  const b = readFileSync(path);
  if (b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { type: 'image/png', width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const marker = b[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { type: 'image/jpeg', height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  if (b.subarray(0, 4).toString() === 'GIF8') {
    return { type: 'image/gif', width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
  }
  if (b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP') {
    const chunk = b.subarray(12, 16).toString();
    if (chunk === 'VP8X') return { type: 'image/webp', width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    if (chunk === 'VP8L') {
      const bits = b.readUInt32LE(21);
      return { type: 'image/webp', width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    return { type: 'image/webp', width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  }
  return null;
}

function check(fix) {
  const cfg = load();
  const errors = [];
  const seen = new Set();
  let changed = false;
  for (const l of cfg.links) {
    const where = `[${l.slug ?? '?'}]`;
    for (const key of ['slug', 'secret', 'file', 'title', 'description', 'brand', 'logo', 'logoAlt']) {
      if (typeof l[key] !== 'string' || !l[key].trim()) errors.push(`${where} missing "${key}"`);
    }
    if (l.slug && !SLUG.test(l.slug)) errors.push(`${where} slug must be lowercase words joined by "-"`);
    if (seen.has(l.slug)) errors.push(`${where} slug used twice`);
    seen.add(l.slug);
    if (l.secret && !UUID.test(l.secret)) errors.push(`${where} secret is not a UUID (use: npm run links -- new-secret)`);
    if (l.file && !FILE.test(l.file)) errors.push(`${where} file must be a plain name ending in .html`);
    else if (l.file && !existsSync(join(PUBLIC, l.file))) errors.push(`${where} public/${l.file} does not exist`);
    if (l.logo && !existsSync(join(PUBLIC, l.logo))) {
      errors.push(`${where} public/${l.logo} does not exist`);
    } else if (l.logo) {
      const info = imageInfo(join(PUBLIC, l.logo));
      if (!info) {
        errors.push(`${where} ${l.logo} is not a PNG/JPEG/GIF/WebP image`);
      } else if (l.logoWidth !== info.width || l.logoHeight !== info.height || l.logoType !== info.type) {
        if (fix) {
          Object.assign(l, { logoWidth: info.width, logoHeight: info.height, logoType: info.type });
          changed = true;
          console.log(`${where} logo set to ${info.width}x${info.height} ${info.type}`);
        } else {
          errors.push(`${where} logo is really ${info.width}x${info.height} ${info.type} (run with --fix)`);
        }
      }
    }
  }
  if (changed) save(cfg);
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log(`OK: ${cfg.links.length} private links`);
}

function list() {
  for (const l of load().links) console.log(`${l.title}\n  ${shareUrl(l)}\n  file: public/${l.file}\n`);
}

/** Tags this site manages in every private document's <head>. */
function managedTags(l) {
  const img = `${SITE}/${l.logo}`;
  return [
    `<meta name="robots" content="noindex,nofollow,noarchive">`,
    `<meta name="description" content="${esc(l.description)}">`,
    `<title>${esc(l.title)}</title>`,
    `<meta property="og:site_name" content="${esc(l.brand)}">`,
    `<meta property="og:title" content="${esc(l.title)}">`,
    `<meta property="og:description" content="${esc(l.description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:image" content="${esc(img)}">`,
    `<meta property="og:image:secure_url" content="${esc(img)}">`,
    `<meta property="og:image:type" content="${esc(l.logoType)}">`,
    `<meta property="og:image:width" content="${l.logoWidth}">`,
    `<meta property="og:image:height" content="${l.logoHeight}">`,
    `<meta property="og:image:alt" content="${esc(l.logoAlt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(l.title)}">`,
    `<meta name="twitter:description" content="${esc(l.description)}">`,
    `<meta name="twitter:image" content="${esc(img)}">`,
  ].join('\n');
}

// Existing copies of the managed tags in an export are dropped so the settings file wins.
const MANAGED = [
  /<title\b[^>]*>[\s\S]*?<\/title>\s*/gi,
  /<meta\s+name=["'](?:robots|description|twitter:[^"']*)["'][^>]*>\s*/gi,
  /<meta\s+property=["']og:[^"']*["'][^>]*>\s*/gi,
];
const stripManaged = (head) => MANAGED.reduce((h, re) => h.replace(re, ''), head);

export function wrapHtml(raw, link) {
  const tags = managedTags(link);
  const headClose = raw.search(/<\/head\s*>/i);
  if (headClose !== -1) {
    // Export already has a full skeleton: replace the managed tags inside <head>.
    const head = stripManaged(raw.slice(0, headClose));
    const charset = head.match(/<meta\s+charset=[^>]*>\s*/i);
    const at = charset ? head.indexOf(charset[0]) + charset[0].length : head.search(/<head\b[^>]*>/i);
    if (at < 0) throw new Error('could not find <head> in the export');
    let insertAt = charset ? at : at + head.match(/<head\b[^>]*>/i)[0].length;
    const viewport = head.slice(insertAt).match(/^\s*<meta\s+name=["']viewport["'][^>]*>\s*/i);
    if (viewport) insertAt += viewport[0].length;
    const sep = head[insertAt - 1] === '\n' ? '' : '\n';
    return head.slice(0, insertAt) + sep + tags + '\n' + head.slice(insertAt) + raw.slice(headClose);
  }
  // Raw Claude export (no <html>/<head>/<body>): head content runs to the first </style>.
  const styleEnd = raw.search(/<\/style\s*>/i);
  const cut = styleEnd === -1 ? 0 : styleEnd + raw.slice(styleEnd).match(/<\/style\s*>/i)[0].length;
  let headPart = stripManaged(raw.slice(0, cut));
  const bodyPart = raw.slice(cut).replace(/^\r?\n/, '');
  // Charset and viewport always go first; take the export's own versions if it has them.
  const take = (re) => {
    const m = headPart.match(re);
    if (!m) return null;
    headPart = headPart.replace(m[0], '');
    return m[0].trim();
  };
  const charset = take(/<meta\s+charset=[^>]*>\s*/i) ?? '<meta charset="utf-8">';
  const viewport =
    take(/<meta\s+name=["']viewport["'][^>]*>\s*/i) ??
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">';
  const top = ['<!doctype html>', '<html lang="en">', '<head>', charset, viewport, tags].join('\n');
  headPart = headPart.replace(/^\s+/, '');
  return `${top}\n${headPart}${headPart.endsWith('\n') || !headPart ? '' : '\n'}</head>\n<body>\n${bodyPart}${bodyPart.endsWith('\n') ? '' : '\n'}</body></html>\n`;
}

function wrap(slug, exportPath) {
  const link = load().links.find((l) => l.slug === slug);
  if (!link) throw new Error(`no link "${slug}" in private-links.json`);
  if (!exportPath || !existsSync(exportPath)) throw new Error(`export file not found: ${exportPath}`);
  const out = wrapHtml(readFileSync(exportPath, 'utf8'), link);
  writeFileSync(join(PUBLIC, link.file), out);
  console.log(`wrote public/${link.file} (${(out.length / 1024).toFixed(0)} KB) -> ${shareUrl(link)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [cmd, ...args] = process.argv.slice(2);
  try {
    if (cmd === 'list') list();
    else if (cmd === 'check') check(args.includes('--fix'));
    else if (cmd === 'new-secret') console.log(randomUUID());
    else if (cmd === 'wrap') wrap(args[0], args[1]);
    else {
      console.log('usage: npm run links -- list | check [--fix] | new-secret | wrap <slug> <export.html>');
      process.exit(cmd ? 1 : 0);
    }
  } catch (e) {
    console.error(String(e.message ?? e));
    process.exit(1);
  }
}
