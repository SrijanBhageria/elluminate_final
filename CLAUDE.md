# Elluminate website — notes for Claude

## Private investor links
All private links (`/p/<slug>/<secret>/`) are defined in `private-links.json`; read `PRIVATE_LINKS.md` before touching them. Never hand-edit middleware, next.config or page files to add/change a link.

- Updating a document: `npm run links -- wrap <slug> <export.html>` (keeps the export's content, adds skeleton + noindex + title/preview tags from the JSON).
- New link: `npm run links -- new-secret`, add the JSON entry, add the logo to `public/`, `wrap`, then `npm run links -- check --fix`.
- Always finish with `npm run links -- check`, `npx tsc --noEmit` and `npx eslint` on changed files (`npm run build` can't run in cloud sandboxes: Google Fonts is blocked), then commit and push to `final` (Vercel auto-deploys). Give the user the shareable URL.
