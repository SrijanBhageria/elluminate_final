import { google } from 'googleapis';
import { NextResponse } from 'next/server';

/**
 * API Route: Save email captures to Google Sheets
 * 
 * This server-side endpoint securely stores user emails when they
 * request to view or download market reports.
 * 
 * POST /api/save-email
 * Body: { email, reportTitle | source, action } 
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const { email, reportTitle, source, action } = await request.json();
    
    // Use reportTitle or source (for backward compatibility)
    const title = reportTitle || source;

    // Validate required fields
    if (!email || !title || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: email, title/source, or action' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Google Sheets is configured
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
        !process.env.GOOGLE_PRIVATE_KEY || 
        !process.env.GOOGLE_SHEET_ID) {
      console.error('Google Sheets API not configured');
      return NextResponse.json(
        { error: 'Email capture not configured' },
        { status: 500 }
      );
    }

    // Set up Google Sheets authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare row data
    const timestamp = new Date().toISOString();
    const referer = request.headers.get('referer') || 'Direct';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Append row to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:F', // Columns: Timestamp, Email, Report/Source, Action, Referer, User Agent
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          timestamp,
          email,
          title,
          action,
          referer,
          userAgent.substring(0, 100), // Truncate long user agents
        ]],
      },
    });

    console.log('✓ Email saved to Google Sheets:', email, title, action);

    return NextResponse.json({ 
      success: true,
      message: 'Email saved successfully' 
    });

  } catch (error) {
    console.error('Failed to save email to Google Sheets:', error);
    
    // Return error but don't expose internal details
    return NextResponse.json(
      { error: 'Failed to save email. Please try again.' },
      { status: 500 }
    );
  }
}

// Disable caching for this API route
export const dynamic = 'force-dynamic';
