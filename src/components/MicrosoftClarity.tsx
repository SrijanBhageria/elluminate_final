'use client';

import { useEffect } from 'react';

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

/**
 * Microsoft Clarity analytics component.
 * Loads only in production and injects the Clarity tracking script.
 * 
 * Setup:
 * 1. Add NEXT_PUBLIC_CLARITY_PROJECT_ID to .env.local and hosting provider
 * 2. Get your project ID from https://clarity.microsoft.com
 */
export default function MicrosoftClarity() {
  useEffect(() => {
    // Skip in development to avoid polluting analytics
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Skip if project ID is not configured
    if (!CLARITY_ID) {
      console.warn('Microsoft Clarity: NEXT_PUBLIC_CLARITY_PROJECT_ID not set');
      return;
    }

    // Inject Clarity script
    (function (c: Window, l: Document, a: string, r: string, i: string, t?: HTMLScriptElement, y?: Element) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (c as any)[a] =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (c as any)[a] ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function (...args: any[]) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((c as any)[a].q = (c as any)[a].q || []).push(args);
        };
      t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      if (y && y.parentNode) {
        y.parentNode.insertBefore(t, y);
      }
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }, []);

  return null;
}

// Type declaration for TypeScript
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clarity?: (command: string, ...args: any[]) => void;
  }
}
