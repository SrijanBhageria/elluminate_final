# Google Sheets API Setup Guide

This guide walks you through setting up Google Sheets API to capture user emails when they view or download market reports.

## Part 1: Google Cloud Console Setup (15 minutes)

### Step 1: Create a Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: [https://console.cloud.google.com](https://console.cloud.google.com)
   - Sign in with your Google account

2. **Create New Project**
   - Click the project dropdown at the top (next to "Google Cloud")
   - Click **"New Project"**
   - **Project name:** `Elluminate Email Capture` (or your choice)
   - **Organization:** Leave as "No organization" if not applicable
   - Click **"Create"**
   - Wait for the project to be created (~30 seconds)

### Step 2: Enable Google Sheets API

1. **Navigate to APIs & Services**
   - In the left sidebar, click **☰ Menu** → **APIs & Services** → **Library**

2. **Search and Enable**
   - In the search bar, type: `Google Sheets API`
   - Click on **"Google Sheets API"**
   - Click the blue **"Enable"** button
   - Wait for it to enable (~10 seconds)

### Step 3: Create a Service Account

1. **Go to Credentials**
   - Left sidebar: **APIs & Services** → **Credentials**

2. **Create Service Account**
   - Click **"+ Create Credentials"** at the top
   - Select **"Service Account"**

3. **Fill in Service Account Details**
   - **Service account name:** `email-capture-bot`
   - **Service account ID:** (auto-filled, e.g., `email-capture-bot@...`)
   - **Description:** `Service account for capturing user emails in Google Sheets`
   - Click **"Create and Continue"**

4. **Skip Optional Steps**
   - **Grant this service account access to project:** Click **"Continue"** (skip this)
   - **Grant users access to this service account:** Click **"Done"** (skip this)

### Step 4: Generate Service Account Key (JSON)

1. **Find Your Service Account**
   - You should now see your service account in the credentials list
   - Click on the service account email (e.g., `email-capture-bot@elluminate-email-capture.iam.gserviceaccount.com`)

2. **Go to Keys Tab**
   - Click the **"Keys"** tab at the top

3. **Create New Key**
   - Click **"Add Key"** → **"Create new key"**
   - Choose **"JSON"** format
   - Click **"Create"**
   - **A JSON file will download automatically** — save it securely!

4. **Important: Copy the Service Account Email**
   - On the same page, copy the service account email address
   - Format: `email-capture-bot@your-project.iam.gserviceaccount.com`
   - You'll need this in Step 2

---

## Part 2: Google Sheets Setup (5 minutes)

### Step 1: Create a New Google Sheet

1. **Go to Google Sheets**
   - Visit: [https://sheets.google.com](https://sheets.google.com)
   - Click **"+ Blank"** to create a new sheet

2. **Name Your Sheet**
   - Click "Untitled spreadsheet" at the top
   - Rename to: `Email Captures - Market Reports`

3. **Set Up Column Headers** (in Row 1)
   ```
   A1: Timestamp
   B1: Email
   C1: Report Title
   D1: Action
   E1: Referer URL
   F1: User Agent
   ```

4. **Format (Optional but Recommended)**
   - Select Row 1 → **Format** → **Text wrapping** → **Wrap**
   - Make headers bold: Select Row 1 → Click **Bold** (Ctrl+B)
   - Freeze header row: Click **View** → **Freeze** → **1 row**

### Step 2: Share Sheet with Service Account

1. **Click the Share Button** (top-right corner)

2. **Add Service Account Email**
   - Paste the service account email from Part 1, Step 4
   - Example: `email-capture-bot@elluminate-email-capture.iam.gserviceaccount.com`

3. **Set Permissions**
   - Change permission from "Viewer" to **"Editor"**
   - **Uncheck** "Notify people" (the service account doesn't need notifications)
   - Click **"Share"** or **"Done"**

### Step 3: Copy the Sheet ID

1. **Get Sheet ID from URL**
   - Look at your browser's address bar
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - Copy the long string between `/d/` and `/edit`
   - Example: `1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T`

---

## Part 3: Environment Variables Setup

You need to add **3 environment variables** from the Google Cloud setup:

### Variables Needed

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=email-capture-bot@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T
```

### How to Get These Values

1. **GOOGLE_SERVICE_ACCOUNT_EMAIL**
   - From Part 1, Step 4 (the email address you copied)
   - Example: `email-capture-bot@elluminate-email-capture.iam.gserviceaccount.com`

2. **GOOGLE_PRIVATE_KEY**
   - Open the JSON file you downloaded in Part 1, Step 4
   - Find the `"private_key"` field
   - Copy the entire value (including `\n` characters and quotes)
   - Example:
     ```json
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhki...\n-----END PRIVATE KEY-----\n"
     ```
   - Copy everything between the outer quotes

3. **GOOGLE_SHEET_ID**
   - From Part 2, Step 3 (the ID you copied from the URL)
   - Example: `1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T`

### Where to Add These

#### Local Development (`.env.local`)

The `.env.local` file has been updated with placeholders. Replace them with your actual values:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id_here
```

**Important:** Keep the quotes around the private key and preserve the `\n` characters exactly as they appear in the JSON file.

#### Production (Vercel)

1. **Go to Vercel Dashboard**
   - Visit: [https://vercel.com](https://vercel.com)
   - Select your project

2. **Add Environment Variables**
   - Go to **Settings** → **Environment Variables**
   - Add each variable:

   **Variable 1:**
   - Name: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Value: `email-capture-bot@your-project.iam.gserviceaccount.com`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Name: `GOOGLE_PRIVATE_KEY`
   - Value: (paste the entire private key with `\n` characters)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 3:**
   - Name: `GOOGLE_SHEET_ID`
   - Value: `1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

3. **Redeploy**
   - After adding variables, go to **Deployments**
   - Click **•••** on the latest deployment → **Redeploy**

---

## Part 4: Testing

### Test Locally

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to Insights page:**
   ```
   http://localhost:3000/insights/
   ```

3. **Click "View Report" or "Download Report"**
   - Enter a test email
   - Submit

4. **Check Google Sheet**
   - Refresh your Google Sheet
   - You should see a new row with:
     - Timestamp
     - Your test email
     - Report title
     - Action (view/download)
     - Referer URL
     - User agent

5. **Check Console**
   - Open browser DevTools → Console
   - Look for:
     ```
     ✓ Email saved successfully
     ✓ Clarity: User identified - test@example.com
     ✓ Clarity: Event tracked - email_captured_view
     ```

### Test on Production

1. **Deploy to Vercel** (with environment variables set)

2. **Visit your live site**

3. **Submit a test email**

4. **Verify in Google Sheet** (should see new row)

5. **Verify in Clarity Dashboard**
   - Go to [clarity.microsoft.com](https://clarity.microsoft.com)
   - Navigate to **Recordings**
   - Filter by custom event: `email_captured_view` or `email_captured_download`
   - You should see sessions with your test email

---

## Part 5: Clarity Dashboard Features

### How to Find Users by Email

1. **Go to Clarity Dashboard** → **Recordings**

2. **Filter by Custom ID:**
   - Click **"Add filter"**
   - Select **"Custom ID"**
   - Enter the email address
   - See all sessions from that user

### Available Events to Filter

- `email_captured_view` — User requested to view a report
- `email_captured_download` — User requested to download a report
- `report_viewed` — Report was opened (after email)
- `report_downloaded` — Report was downloaded (after email)

### Session Tags

Each session with email capture will have:
- **email** tag with the user's email address
- **report** tag with the report title
- **action** tag with "view" or "download"

---

## Troubleshooting

### Error: "Email capture not configured"

**Cause:** Environment variables not set or incorrect

**Fix:**
1. Check `.env.local` has all three variables
2. Restart dev server: `npm run dev`
3. For production, verify Vercel environment variables are set

### Error: "Failed to save email"

**Possible causes:**
1. **Service account not shared with sheet**
   - Go to Google Sheet → Share → Add service account email
2. **Wrong Sheet ID**
   - Check the Sheet ID in URL matches your env var
3. **Private key format issue**
   - Make sure private key includes literal `\n` characters
   - Keep quotes around the entire key

### No data appearing in Clarity

**Cause:** Clarity only tracks production sites

**Fix:**
1. Make sure you're testing on deployed site (not localhost)
2. Wait 5-10 minutes for data to appear
3. Check browser console for Clarity tracking logs

---

## Security Notes

1. **Never commit the JSON key file** to Git
   - It's already in `.gitignore` under `.env*`

2. **Service account has minimal permissions**
   - Only has access to the one sheet you shared
   - Cannot access your personal Google Drive

3. **Private key is server-side only**
   - Stored in Vercel as an environment variable
   - Never exposed to the browser

4. **Rate limiting**
   - Google Sheets API has a 60 requests/minute limit
   - More than enough for typical traffic

---

## What You'll See After Setup

### In Google Sheets

| Timestamp | Email | Report Title | Action | Referer URL | User Agent |
|-----------|-------|--------------|--------|-------------|------------|
| 2026-09-09T00:15:30Z | investor@vc.com | India Electronics | view | https://yoursite.com/insights/ | Mozilla/5.0... |
| 2026-09-09T00:18:45Z | investor@vc.com | India Electronics | download | https://yoursite.com/insights/ | Mozilla/5.0... |

### In Clarity Dashboard

- **Recordings** filtered by `investor@vc.com`
- **Session timeline** with custom event markers
- **Heatmaps** showing where users click after viewing reports
- **User journey** from landing → insights → email capture → report view

---

## Summary Checklist

### Google Cloud Console
- [ ] Created project
- [ ] Enabled Google Sheets API
- [ ] Created service account
- [ ] Downloaded JSON key file
- [ ] Copied service account email

### Google Sheets
- [ ] Created new sheet
- [ ] Added column headers
- [ ] Shared with service account (Editor permission)
- [ ] Copied Sheet ID from URL

### Environment Variables
- [ ] Added `GOOGLE_SERVICE_ACCOUNT_EMAIL` to `.env.local`
- [ ] Added `GOOGLE_PRIVATE_KEY` to `.env.local`
- [ ] Added `GOOGLE_SHEET_ID` to `.env.local`
- [ ] Added all three to Vercel environment variables

### Testing
- [ ] Tested locally (check Google Sheet)
- [ ] Deployed to Vercel
- [ ] Tested on production
- [ ] Verified Clarity tracking

---

**Total Setup Time: ~20 minutes**

**Cost: $0** (Free tier for expected traffic)

If you encounter any issues, check the Troubleshooting section above or verify each step in the checklist.
