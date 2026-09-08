/**
 * Microsoft Clarity Utilities
 * 
 * These functions help track user actions in Clarity and identify users
 * by their email address for session filtering and analysis.
 */

/**
 * Identify user in Microsoft Clarity with their email.
 * This tags the session so you can filter recordings by email in the dashboard.
 */
export function identifyUserInClarity(email: string): void {
  if (typeof window !== 'undefined' && window.clarity) {
    try {
      // Set custom user ID (email)
      window.clarity('set', 'email', email);
      
      // Identify user for user-level tracking
      window.clarity('identify', email);
      
      console.log('✓ Clarity: User identified -', email);
    } catch (error) {
      console.error('Clarity identify failed:', error);
    }
  }
}

/**
 * Track custom events in Clarity.
 * Use this to mark specific actions like email captures, report views, etc.
 * 
 * @param eventName - Name of the event (e.g., 'email_captured_view')
 * @param metadata - Optional key-value pairs to attach to the event
 */
export function trackClarityEvent(
  eventName: string,
  metadata?: Record<string, string>
): void {
  if (typeof window !== 'undefined' && window.clarity) {
    try {
      // Track the event
      window.clarity('event', eventName);
      
      // Optionally set metadata as custom tags
      if (metadata) {
        Object.entries(metadata).forEach(([key, value]) => {
          window.clarity?.('set', key, value);
        });
      }
      
      console.log('✓ Clarity: Event tracked -', eventName, metadata || '');
    } catch (error) {
      console.error('Clarity event tracking failed:', error);
    }
  }
}

/**
 * Track page-specific actions with consistent naming.
 */
export const ClarityEvents = {
  EMAIL_CAPTURED_VIEW: 'email_captured_view',
  EMAIL_CAPTURED_DOWNLOAD: 'email_captured_download',
  REPORT_VIEWED: 'report_viewed',
  REPORT_DOWNLOADED: 'report_downloaded',
} as const;
