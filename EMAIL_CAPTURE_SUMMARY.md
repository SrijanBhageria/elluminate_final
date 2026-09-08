# Email Capture Integration - Summary

## ✅ What Was Implemented

### 1. Google Sheets API Integration
- **API Route:** `src/app/api/save-email/route.ts`
  - Secure server-side endpoint
  - Saves emails to Google Sheets
  - Validates email format
  - Captures timestamp, report title, action, referer, and user agent

### 2. Microsoft Clarity Tracking
- **Utility:** `src/utils/clarity.ts`
  - `identifyUserInClarity()` — Tags sessions with user email
  - `trackClarityEvent()` — Logs custom events
  - Predefined events: `email_captured_view`, `email_captured_download`, `report_viewed`, `report_downloaded`

### 3. Updated Components
- **PDFCard.tsx**
  - Now captures email for BOTH "View Report" and "Download Report"
  - Sends email to Google Sheets API
  - Tracks user in Clarity
  - Opens report after email submission

- **DownloadEmailModal.tsx**
  - Dynamic modal title and description based on action type
  - Shows "View Report" or "Download Report" text
  - Button text changes to "Viewing..." or "Downloading..."

### 4. Package Installation
- Installed `googleapis` package for Google Sheets API integration

---

## 📋 Environment Variables You Need

You need to add **3 variables** to both `.env.local` and Vercel:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id_here
```

### How to Get These Values

Follow the complete guide in **`GOOGLE_SHEETS_SETUP.md`**

Quick overview:

1. **GOOGLE_SERVICE_ACCOUNT_EMAIL**
   - From Google Cloud Console → Service Account email
   - Format: `email-capture-bot@your-project.iam.gserviceaccount.com`

2. **GOOGLE_PRIVATE_KEY**
   - From downloaded JSON key file → `"private_key"` field
   - Copy entire value including `\n` characters and surrounding quotes
   - Keep it exactly as-is from the JSON

3. **GOOGLE_SHEET_ID**
   - From Google Sheets URL
   - Format: `1A2B3C4D5E6F7G8H9I0J...`
   - The long string between `/d/` and `/edit` in the URL

---

## 🎯 Google Cloud Console Steps

### 1. Create Project
- Go to [console.cloud.google.com](https://console.cloud.google.com)
- Create new project: "Elluminate Email Capture"

### 2. Enable API
- APIs & Services → Library
- Search "Google Sheets API"
- Click Enable

### 3. Create Service Account
- APIs & Services → Credentials
- Create Credentials → Service Account
- Name: `email-capture-bot`
- Skip optional steps

### 4. Generate Key
- Click on service account
- Keys tab → Add Key → Create new key
- Choose JSON format
- **File downloads automatically** — save it!
- Copy the service account email address

### 5. Create Google Sheet
- Go to [sheets.google.com](https://sheets.google.com)
- Create new sheet: "Email Captures - Market Reports"
- Add headers in Row 1:
  ```
  A: Timestamp | B: Email | C: Report Title | D: Action | E: Referer URL | F: User Agent
  ```

### 6. Share Sheet
- Click Share button
- Paste service account email
- Set permission to "Editor"
- Uncheck "Notify people"
- Click Share

### 7. Copy Sheet ID
- From URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
- Copy the long ID between `/d/` and `/edit`

---

## 🔧 What to Do in Vercel

### Add Environment Variables

1. **Go to Vercel Dashboard**
   - Select your project
   - Settings → Environment Variables

2. **Add Three Variables:**
   
   | Variable Name | Value | Environments |
   |---------------|-------|--------------|
   | `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `email-capture-bot@...` | Production, Preview, Development |
   | `GOOGLE_PRIVATE_KEY` | `"-----BEGIN...END-----\n"` | Production, Preview, Development |
   | `GOOGLE_SHEET_ID` | `1A2B3C4D5E6F...` | Production, Preview, Development |

3. **Redeploy**
   - Go to Deployments
   - Click ••• on latest → Redeploy

---

## 📊 What Data Gets Captured

### In Google Sheets (Every Email Submission)

| Column | Example Value | Description |
|--------|---------------|-------------|
| Timestamp | 2026-09-09T00:30:15Z | ISO 8601 format |
| Email | investor@vc.com | User's email address |
| Report Title | India Electronics: The Market Memo | Report name |
| Action | view | "view" or "download" |
| Referer URL | https://yoursite.com/insights/ | Page URL |
| User Agent | Mozilla/5.0... | Browser info |

### In Clarity Dashboard (Automatically Tagged)

- **User ID:** Email address
- **Custom Events:**
  - `email_captured_view` — When viewing
  - `email_captured_download` — When downloading
  - `report_viewed` — After opening report
  - `report_downloaded` — After download starts
- **Custom Tags:**
  - `email` — User's email
  - `report` — Report title
  - `action` — "view" or "download"

---

## 🧪 Testing Instructions

### Local Testing

1. **Make sure environment variables are set in `.env.local`**

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

3. **Open Insights page:**
   ```
   http://localhost:3000/insights/
   ```

4. **Click "View Report" button**
   - Email modal appears
   - Enter test email: `test@example.com`
   - Submit
   - Report opens in new tab

5. **Check Google Sheet**
   - Refresh the sheet
   - New row should appear with your test data

6. **Check Browser Console**
   ```
   ✓ Email saved successfully
   ✓ Clarity: User identified - test@example.com
   ✓ Clarity: Event tracked - email_captured_view
   ```

### Production Testing

1. **Deploy with Vercel environment variables**

2. **Visit live site → Insights page**

3. **Submit real email**

4. **Verify in Google Sheet** (new row appears)

5. **Verify in Clarity**
   - Go to [clarity.microsoft.com](https://clarity.microsoft.com)
   - Recordings → Filter by custom event
   - Find your session

---

## 🔐 Security Notes

✅ **Private key is server-side only**
- Not exposed to browser
- Stored securely in Vercel

✅ **Service account has minimal permissions**
- Only accesses the one shared sheet
- Cannot access your personal Drive

✅ **API route validates input**
- Email format validation
- Required field checks

✅ **No sensitive data logged**
- Only email, report title, and action
- No passwords or payment info

---

## 💰 Cost

**Total: $0/month** for expected traffic

- Google Sheets API: Free (60 req/min)
- Google Cloud Platform: Free
- Vercel Functions: Free (100K invocations/month)
- Microsoft Clarity: Free (unlimited)

---

## 📈 Analytics You'll Get

### From Google Sheets
- Email list with timestamps
- Most popular reports
- View vs. download ratio
- Export to CSV for email campaigns

### From Clarity
- User behavior before email capture
- What users do after viewing reports
- Session recordings of entire journey
- Heatmaps showing engagement

### Combined Insights
- Filter Clarity sessions by email
- See individual user journeys
- Identify power users
- Optimize report placement

---

## 🚀 Next Steps

1. **Complete Google Cloud setup** (see `GOOGLE_SHEETS_SETUP.md`)
2. **Add environment variables** locally and in Vercel
3. **Test locally** with dev server
4. **Deploy to production**
5. **Test on live site**
6. **Monitor Google Sheet** for incoming emails
7. **Check Clarity dashboard** for user sessions

---

## 📁 Files Changed/Created

### New Files
- `src/app/api/save-email/route.ts` — API endpoint
- `src/utils/clarity.ts` — Clarity helpers
- `GOOGLE_SHEETS_SETUP.md` — Complete setup guide
- `EMAIL_CAPTURE_SUMMARY.md` — This file

### Modified Files
- `src/components/PDFCard.tsx` — Added email gate for View button
- `src/components/DownloadEmailModal.tsx` — Dynamic text for View/Download
- `.env.local` — Added Google Sheets variables
- `package.json` — Added googleapis dependency

### Unchanged (Already Set Up)
- `src/components/MicrosoftClarity.tsx` — Already tracking
- `src/app/layout.tsx` — Already has Clarity component
- `src/app/insights/page.tsx` — No changes needed

---

## 🆘 Troubleshooting

### Issue: "Email capture not configured"
**Fix:** Add all 3 environment variables and restart server

### Issue: "Failed to save email"
**Fix:** 
1. Share Google Sheet with service account email
2. Verify Sheet ID is correct
3. Check private key format (must include `\n`)

### Issue: No data in Clarity
**Fix:**
1. Test on production site (not localhost)
2. Wait 5-10 minutes for data
3. Check console for tracking logs

### Issue: Private key format error
**Fix:** Copy private key exactly from JSON file, including all `\n` characters and surrounding quotes

---

## 📞 Support Resources

- **Google Sheets API Docs:** [developers.google.com/sheets](https://developers.google.com/sheets)
- **Clarity Docs:** [docs.microsoft.com/clarity](https://docs.microsoft.com/clarity)
- **Vercel Env Vars:** [vercel.com/docs/environment-variables](https://vercel.com/docs/environment-variables)

---

**Status: ✅ Ready to deploy** (pending environment variable configuration)
