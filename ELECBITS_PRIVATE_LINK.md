# 🔒 Elecbits Company Presentation - Private Link

## Share This Link

### Local (Testing)
```
http://localhost:3000/p/elecbits-company-presentation/b75d3200-7979-4e85-8b08-154bd34ae22a
```

### Production (Share with recipients)
```
https://your-domain.com/p/elecbits-company-presentation/b75d3200-7979-4e85-8b08-154bd34ae22a
```

Replace `your-domain.com` with your actual production URL (e.g., `elluminate.vercel.app` or `elluminate.io`).

---

## How It Works

When someone clicks this link:

1. **First Visit**:
   - Document loads with blur effect in background
   - Email modal appears on top
   - User enters email to access
   - Email is saved to Google Sheets + Clarity
   - Modal closes, document becomes interactive

2. **Return Visits**:
   - Document loads immediately
   - No email prompt (remembered in browser)

3. **Wrong UUID**:
   - If someone tries a different UUID → 404 error
   - Only this exact UUID works

---

## Security

✅ **UUID Token**: `b75d3200-7979-4e85-8b08-154bd34ae22a`  
✅ **Impossible to guess** (cryptographic randomness)  
✅ **Verified server-side** (404 if wrong)  
✅ **Not indexed** by Google (robots.txt + noindex)  
✅ **Tracks all access** (Google Sheets + Clarity)

---

## Data Collection

Every email capture logs:
- Email address
- Document name
- Timestamp
- Referer URL
- User agent

View in:
- **Google Sheets**: [Your Sheet](https://docs.google.com/spreadsheets/d/1qNDdcugvctvDtGj-yUNDrnw49rctLrHti2Gsnq-2vsc)
- **Clarity Dashboard**: Filter by event `private_document_access`

---

## Testing Checklist

- [ ] Test locally first
- [ ] Verify email modal appears
- [ ] Submit test email
- [ ] Verify modal closes and document is visible
- [ ] Refresh page → should load directly
- [ ] Clear localStorage → modal appears again
- [ ] Test wrong UUID → should get 404
- [ ] Check Google Sheets for email entry
- [ ] Deploy to production
- [ ] Test production link
- [ ] Share with intended recipients

---

**Need to regenerate the UUID?** Run:
```bash
uuidgen | tr '[:upper:]' '[:lower:]'
```

Then update:
1. Folder name in `src/app/p/elecbits-company-presentation/[new-uuid]/`
2. `VALID_TOKEN` constant in `page.tsx`
3. `.env.local` reference
4. This document

---

**Last Updated**: Sep 13, 2026  
**UUID**: `b75d3200-7979-4e85-8b08-154bd34ae22a`
