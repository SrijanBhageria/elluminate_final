# Microsoft Clarity Setup

Microsoft Clarity is now installed and ready to use.

## Configuration Steps

### 1. Get Your Clarity Project ID
1. Go to [https://clarity.microsoft.com](https://clarity.microsoft.com)
2. Sign in with your Microsoft account
3. Click **"Add new project"**
4. Enter your site details (e.g., `elluminatecapital.com`)
5. Copy your **Project ID** (format: `abc123xyz`)

### 2. Add the Project ID to Environment Variables

**For local development:**
Edit `.env.local` in the project root:
```bash
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id_here
```

**For production (Vercel, etc.):**
Add the same environment variable in your hosting provider's dashboard under **Environment Variables**.

### 3. Deploy and Verify

After deploying with the environment variable set:

1. Open your site in a browser
2. Open DevTools → **Network** tab
3. Filter for `clarity`
4. You should see requests to `https://www.clarity.ms/tag/...`
5. Visit your Clarity dashboard — data appears within minutes

## Implementation Details

- **Component:** `src/components/MicrosoftClarity.tsx`
- **Loaded in:** `src/app/layout.tsx` (tracks all pages)
- **Only runs in:** Production (`NODE_ENV === 'production'`)
- **Privacy:** Sensitive fields (passwords, credit cards) are auto-masked

## Custom Event Tracking (Optional)

To track specific actions (e.g., report downloads), use:

```typescript
window.clarity?.('event', 'report_download');
```

Add this in event handlers where you want custom tracking.

## Notes

- The component is a **client component** (`'use client'`) that loads only in the browser
- Development traffic is **excluded** to keep analytics clean
- The script loads **asynchronously** and doesn't block page rendering
- Works with your Next.js App Router and client-side navigation

## Troubleshooting

**No data in dashboard?**
- Verify `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set in production environment
- Check that you're viewing the site in production mode (not dev server)
- Allow 5-10 minutes for initial data to appear

**Want to test in development?**
Temporarily remove the `NODE_ENV` check in `MicrosoftClarity.tsx`, but remember to restore it before committing.
