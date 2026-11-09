# Private investor links

Every private link lives in **one file: `private-links.json`**. Nothing else needs editing.

| Field | What it is |
|---|---|
| `slug` | Name in the URL, lowercase words joined by `-` (e.g. `sumosave-store-playbook`) |
| `secret` | The unguessable part of the URL (a UUID). Changing it kills the old link. |
| `file` | The HTML document in `public/` |
| `title`, `description` | Shown in the browser tab and in WhatsApp / LinkedIn / Slack previews |
| `brand` | Small site name above the preview title (e.g. `SumoSave`) |
| `logo`, `logoAlt` | Preview image in `public/` and its alt text |
| `logoWidth`, `logoHeight`, `logoType` | Filled in automatically by `npm run links -- check --fix` |

Shareable URL: `https://www.elluminate.in/p/<slug>/<secret>/`

## How it works

- `next.config.ts` rewrites each secret URL straight to `public/<file>` (the document owns the page, no iframe) and sends `X-Robots-Tag: noindex`.
- `src/middleware.ts` gives social-preview bots a tiny preview page (`src/app/link-preview/[slug]/route.ts`) built from the JSON, blocks direct visits to that preview route, and returns 404 when someone types the raw file path (`/<file>.html`) into a browser.
- `src/app/p/[slug]/page.tsx` is the email-gate page at `/p/<slug>/` (no secret). `src/app/p/[slug]/[uuid]/page.tsx` 404s wrong secrets.

## Common jobs

All commands run from the repo root.

**Update a document's content** (new export of an existing link):
```
npm run links -- wrap <slug> "/path/to/export.html"
```
This writes `public/<file>`, adding the page skeleton, noindex and the title/description/preview tags from the JSON. The export's own content is kept as-is.

**Change a title, description or logo:** edit the entry in `private-links.json` (put a new logo in `public/` first), run `npm run links -- check --fix`, then re-run `wrap` with the latest export (or re-wrap the current file: `npm run links -- wrap <slug> public/<file>`) so the document's own tab title matches.

**Add a new link:**
1. `npm run links -- new-secret` → copy the UUID.
2. Add an entry to `private-links.json`.
3. Put the logo in `public/` if it's new.
4. `npm run links -- wrap <slug> "/path/to/export.html"`
5. `npm run links -- check --fix`

**See all links:** `npm run links -- list`

Then commit and push to `final`; Vercel deploys automatically.

WhatsApp caches previews per URL, so a changed title/logo may keep showing the old preview in chats where the link was already sent.
