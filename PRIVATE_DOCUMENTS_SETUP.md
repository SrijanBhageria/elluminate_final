# Private Document Sharing Setup

This guide explains how the private document sharing feature works with email capture.

## Overview

The private document feature allows you to share HTML documents via hard-to-guess URLs that:
- ✅ Are **not indexed** by Google or other search engines
- ✅ Require **email capture** before viewing
- ✅ Show the document **in the background** during email capture
- ✅ **Remember users** so they don't need to re-enter email for the same document
- ✅ Track access in **Google Sheets** and **Microsoft Clarity**

## How It Works

### 1. URL Structure

Private documents use the `/p/` prefix with a UUID token:
```
https://elluminate.io/p/elecbits-company-presentation/b75d3200-7979-4e85-8b08-154bd34ae22a
```

The URL structure is:
- **`/p/[document-name]/[uuid]`** format
- **UUID token required** - without the correct UUID, returns 404
- **Not indexed** by search engines (robots.txt + noindex meta tags)
- **Impossible to guess** - UUID provides cryptographic randomness

### 2. Email Gate Component

**File:** `src/components/PrivateDocumentGate.tsx`

This component:
1. Checks localStorage to see if the user has already accessed this document
2. If yes → Shows document immediately
3. If no → Shows email capture modal with document blurred in background
4. On email submission:
   - Saves email to Google Sheets via `/api/save-email`
   - Tracks in Microsoft Clarity
   - Stores access in localStorage (key: `doc_access_{documentId}`)
   - Hides the gate and shows the document

### 3. Document-Specific Memory

The component uses localStorage with a **document-specific key**:
```typescript
const storageKey = `doc_access_${documentId}`;
```

This means:
- User enters email once for "Elecbits Presentation" → stored as `doc_access_elecbits-company-presentation`
- User visits a different document → will need to enter email again
- Same user returns to "Elecbits Presentation" → no email required

### 4. Data Collection

When a user enters their email, we collect:
- **Email address**
- **Document title** (e.g., "Elecbits - Company Presentation")
- **Action type** (`document_access`)
- **Timestamp**
- **Referer** (where they came from)
- **User Agent** (browser info)

This data is saved to:
1. **Google Sheets** (your existing sheet with ID `1qNDdcugvctvDtGj-yUNDrnw49rctLrHti2Gsnq-2vsc`)
2. **Microsoft Clarity** (project ID `yf7wkmgdy2`)

## File Structure

```
src/
├── app/
│   └── p/
│       └── elecbits-company-presentation/
│           └── b75d3200-7979-4e85-8b08-154bd34ae22a/
│               └── page.tsx                # Private page route with UUID verification
├── components/
│   └── PrivateDocumentGate.tsx             # Email gate component
public/
├── elecbits-presentation.html              # The HTML document
└── robots.txt                              # Disallows /p/ from indexing
```

## Adding More Private Documents

To add another private document:

### Step 1: Copy the HTML file
```bash
cp "/path/to/document.html" ./public/your-document.html
```

### Step 2: Generate a UUID token
```bash
uuidgen | tr '[:upper:]' '[:lower:]'
# Example output: c8d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f
```

### Step 3: Create a new page
Create `src/app/p/your-document-name/[your-uuid]/page.tsx`:

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PrivateDocumentGate from '@/components/PrivateDocumentGate';

export const metadata: Metadata = {
  title: 'Your Document Title',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

// Valid access token for this document (replace with your UUID)
const VALID_TOKEN = 'c8d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f';

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function YourDocument({ params }: PageProps) {
  const { uuid } = await params;
  
  // Verify the UUID token
  if (uuid !== VALID_TOKEN) {
    notFound();
  }

  return (
    <PrivateDocumentGate
      documentId="your-unique-document-id"
      documentTitle="Your Document Title"
    >
      <iframe
        src="/your-document.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        title="Your Document Title"
      />
    </PrivateDocumentGate>
  );
}
```

### Step 4: Share the link
Share the URL: `https://elluminate.io/p/your-document-name/c8d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f`

**Important:** 
- Use a descriptive document name (helps with organization)
- Each document gets its own UUID token
- Without the correct UUID, users get a 404 error
- Store the UUID in `.env.local` for reference

## Security Features

### 1. UUID Token Verification
- Each document requires a valid UUID token in the URL
- Wrong or missing UUID returns 404 (Not Found)
- UUID is cryptographically random (impossible to guess)
- Token is verified server-side before rendering

### 2. Robots.txt
```
Disallow: /p/
```
Tells search engines not to crawl any URLs under `/p/`.

### 3. Meta Tags
```typescript
robots: {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
  },
}
```
Extra protection at the page level.

### 4. Hard-to-Guess URLs
Using random or unique paths makes it impossible to discover documents without the link.

### 5. No Sitemap
Private pages are **not included** in your sitemap, so search engines won't find them there.

## User Experience

### First Visit
1. User clicks shared link
2. Page loads with document blurred in background
3. Email modal appears on top
4. User enters email and clicks "Continue"
5. Modal shows loading spinner
6. Modal fades out, document becomes interactive

### Subsequent Visits
1. User clicks same link
2. Document loads immediately (no email prompt)
3. Seamless viewing experience

### Different Document
1. User clicks link to a different private document
2. Email prompt appears again (different `documentId`)
3. This is intentional to track access per document

## Analytics & Tracking

All email captures are tracked in:

### Google Sheets
Column structure:
- **A:** Timestamp
- **B:** Email
- **C:** Document Title / Source
- **D:** Action (e.g., `document_access`)
- **E:** Referer
- **F:** User Agent

### Microsoft Clarity
Events tracked:
```typescript
clarity('identify', email);
clarity('event', 'private_document_access', {
  documentId,
  documentTitle,
});
```

You can filter Clarity sessions by:
- Custom event: `private_document_access`
- User ID: `email@example.com`

## Privacy

The email gate includes a privacy notice:
> "🔒 We'll never share your email. Your privacy is important to us."

Make sure this aligns with your actual privacy policy.

## Testing

### Test the Email Gate
1. Open: `http://localhost:3000/p/elecbits-company-presentation/b75d3200-7979-4e85-8b08-154bd34ae22a`
2. Verify you see the email modal with blurred document in background
3. Enter a test email and submit
4. Verify modal closes and document becomes visible
5. Refresh the page
6. Verify document loads immediately (no email prompt)

### Test UUID Verification
1. Try accessing with wrong UUID: `http://localhost:3000/p/elecbits-company-presentation/wrong-uuid`
2. Should return 404 (Not Found)
3. Try accessing without UUID: `http://localhost:3000/p/elecbits-company-presentation`
4. Should return 404 (Not Found)

### Test localStorage
Open browser DevTools → Application → Local Storage → `http://localhost:3000`

You should see:
```
doc_access_elecbits-company-presentation = "true"
```

### Clear Access (for testing)
```javascript
localStorage.removeItem('doc_access_elecbits-company-presentation');
```

### Test Google Sheets Integration
1. Submit an email
2. Open your Google Sheet
3. Verify new row appears with:
   - Current timestamp
   - Your email
   - "Elecbits - Company Presentation"
   - "document_access"
   - Referer URL
   - User agent string

## Deployment Checklist

Before deploying to production:

- [x] HTML file copied to `/public/`
- [x] Page created under `/src/app/p/[unique-url]/`
- [x] `robots.txt` includes `Disallow: /p/`
- [x] Environment variables set in Vercel:
  - `NEXT_PUBLIC_CLARITY_PROJECT_ID`
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_PRIVATE_KEY`
  - `GOOGLE_SHEET_ID`
- [ ] Test email capture in production
- [ ] Verify Google Sheet receives data
- [ ] Verify Clarity tracks events
- [ ] Clear localStorage and test "remember me" functionality
- [ ] Share the link with intended recipients

## Troubleshooting

### Email modal doesn't appear
- Check browser console for errors
- Verify `documentId` is set correctly
- Clear localStorage and try again

### Email not saving to Google Sheets
- Check Vercel environment variables
- Verify service account has edit access to the sheet
- Check API route logs: `https://vercel.com/your-project/logs`
- Test API directly: `POST /api/save-email` with sample data

### Document appears in Google search
- Verify `robots.txt` is deployed
- Check page meta tags in browser inspector
- Request removal in Google Search Console (if needed)
- Ensure link is not posted publicly on indexed pages

### User sees email prompt on every visit
- Check localStorage in DevTools
- Verify `documentId` matches between visits
- Ensure localStorage is not being cleared by browser settings
- Check for browser incognito mode

## Best Practices

1. **Use unique URLs**: Don't use predictable patterns like `doc1`, `doc2`
2. **Share carefully**: Only share links with intended recipients
3. **Monitor access**: Review Google Sheets regularly to see who's accessing
4. **Update titles**: Keep document titles descriptive for analytics
5. **Test before sharing**: Always test the full flow before sending links
6. **Backup data**: Export Google Sheets data periodically

## Future Enhancements

Potential improvements:
- Add password protection on top of email
- Set expiration dates for document access
- Generate unique tokens per recipient
- Send email confirmations with magic links
- Add download tracking
- Implement view counters
- Add document watermarking

---

**Need help?** Check the logs:
- **Frontend errors:** Browser console
- **API errors:** Vercel function logs
- **Google Sheets issues:** Check service account permissions
