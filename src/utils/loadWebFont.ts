import type { FontFamily } from '../contexts/ThemeContext';

const FONTSHARE_FONTS = new Set<FontFamily>([
  'cabinet-grotesk',
  'satoshi',
  'clash-display',
  'chillax',
  'switzer',
]);

/** Fonts already shipped with the document (next/font or a static <link>). */
const PRELOADED_FONTS = new Set<FontFamily>([
  'montserrat',
  'jetbrains-mono',
  'cascadia-code',
]);

/** Google Fonts family name when it differs from the picker display name. */
const GOOGLE_FAMILY_OVERRIDES: Partial<Record<FontFamily, string>> = {
  'geist-sans': 'Geist',
};

function stylesheetHref(font: FontFamily, displayName: string): string | null {
  if (PRELOADED_FONTS.has(font)) {
    return null;
  }

  if (FONTSHARE_FONTS.has(font)) {
    return `https://api.fontshare.com/v2/css?f[]=${font}@300,400,500,600,700&display=swap`;
  }

  const family = GOOGLE_FAMILY_OVERRIDES[font] ?? displayName;
  const encoded = family.replace(/ /g, '+');
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@300;400;500;600;700&display=swap`;
}

function injectStylesheet(id: string, href: string) {
  if (document.getElementById(id)) {
    return;
  }

  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

/** Load a single picker font when the user selects it. */
export function loadWebFont(font: FontFamily, displayName: string) {
  if (typeof document === 'undefined') {
    return;
  }

  const href = stylesheetHref(font, displayName);
  if (!href) {
    return;
  }

  injectStylesheet(`webfont-${font}`, href);
}
